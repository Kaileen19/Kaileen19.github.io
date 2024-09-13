import { fetchData } from "./fetchData.js";
import { xpChart } from "./addXpchart.js";
import { addUsername } from "./addUsername.js";
import { addLevel } from "./addLevel.js";
import { addExercises } from "./addExercises.js";
import { addAudits } from "./addAudits.js";
import { logout } from "./logout.js";

export let query = `

{

username:transaction(limit:1){
userLogin}


  downTransactions: transaction(where: { type: { _eq: "down" } }) {
    amount
  }
  upTransactions: transaction(where: { type: { _eq: "up" } }) {
    amount
  }


xp:transaction_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: 148 } }) {
    aggregate {
      sum {
        amount
      }
    }
}


level:
transaction(
    limit: 1
    order_by: { amount: desc }
    where: { type: { _eq: "level" }, eventId: { _eq: 148 } }
  ) {
    amount
  }



  exercises: transaction(
    where: { _and: [{ type: { _eq: "xp" } }, { path: { _niregex: "(piscine)" } }] }
    order_by: { createdAt: asc }
  ) {
    amount
    createdAt
    object {
      name
    }
  }
}

`;

export async function queryGraph(jwtToken) {
  console.log("made it here");
  try {
    let graph = await fetchData(jwtToken);

    let downTransactions = graph.data.downTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );
    let upTransactions = graph.data.upTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );
    let xp = graph.data.xp.aggregate.sum.amount;
    let username = graph.data.username[0].userLogin;
    let level = graph.data.level[0].amount;
    let exercises = graph.data.exercises;

    let mainContainer = document.createElement("div");
    mainContainer.id = "mainContainer";
    mainContainer.style.display = "flex";
    mainContainer.style.flexDirection = "column";
    document.body.appendChild(mainContainer);

    let usernameContainer = document.createElement("div");
    usernameContainer.id = "usernameContainer";
    usernameContainer.style.display = "flex";
    usernameContainer.style.flexDirection = "row-reverse";
    usernameContainer.style.justifyContent = "space-between";
    mainContainer.appendChild(usernameContainer);

    let xpContainer = document.createElement("div");
    xpContainer.id = "xpContainer";
    mainContainer.appendChild(xpContainer);

    let levelContainer = document.createElement("div");
    levelContainer.id = "levelContainer";
    mainContainer.appendChild(levelContainer);

    let exercisesContainer = document.createElement("div");
    exercisesContainer.id = "exercisesContainer";
    mainContainer.appendChild(exercisesContainer);

    let auditsContainer = document.createElement("div");
    auditsContainer.id = "auditsContainer";
    auditsContainer.style.backgroundColor = "#d8aaad";
    mainContainer.appendChild(auditsContainer);

    let logoutContainer = document.createElement("button");
    logoutContainer.id = "logoutContainer";
    logoutContainer.innerHTML = "Logout";
    logoutContainer.onclick = () => logout(mainContainer);
    usernameContainer.appendChild(logoutContainer);

    addAudits(
      { incoming: upTransactions, outgoing: downTransactions },
      xp,
      auditsContainer
    );
    xpChart(xp, xpContainer);
    addUsername(username, usernameContainer);
    addLevel(level, levelContainer);

    addExercises(exercises, exercisesContainer);
  } catch (error) {
    console.log(error);
  }
}
