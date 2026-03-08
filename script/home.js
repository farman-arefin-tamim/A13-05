let openData=[];
let closedData=[];

const allBtn=document.getElementById("all-btn");
const openBtn=document.getElementById("open-btn");
const closedBtn=document.getElementById("closed-btn");




const loadData=()=>{
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaydata(data.data));
};

let currentStates='all';


function switchTab(id){
    console.log(id);
    const tabs=["all","open","closed"];

    for(const tab of tabs){
        const tabName=document.getElementById(tab+"-btn");
        if(tab===id){
            tabName.classList.add("btn-primary");
        }else{
            tabName.classList.remove("btn-primary");
        }
    }
    
};

switchTab(currentStates);

const statusImg=(issue)=>{
    if(issue.status==="open"){
        return './assets/Open-Status.png';
    }else{
        return './assets/Closed-Status.png';
    }
};

//Priority Class
const priorityClasses = {
  high: "badge-error",
  medium: "badge-warning",
  low: "badge"
};

//Border Class
const borderClass={
    open: "border-green-700",
    closed:"border-purple-700"
};


// const displaydata=(issues)=>{
   
//     openData=[];
//     closedData=[];

//     // separate open and closed issues
//     for(const issue of issues){

//         if(issue.status === "open"){
//             openData.push(issue);
//         }else{
//             closedData.push(issue);
//         }

//     }

//     const cardSection = document.getElementById("card-section");
//     cardSection.innerHTML="";

//     for(const issue of issues){
//         const card=document.createElement("div");
//         card.innerHTML=`
//              <div class="card w-70 h-70 bg-base-100 card-sm shadow-sm border-t-4 ${borderClass[issue.status]}">
//                 <div class="card-body">
//                      <div class="flex justify-between">
//                         <img src="${statusImg(issue)}" alt="">
//                         <div class="badge badge-soft font-semibold ${priorityClasses[issue.priority]}">${issue.priority}</div>
//                     </div>
//                     <h2 class="card-title">${issue.title}</h2>
//                     <p class="text-gray-400">${issue.description}</p>

//                     <div>
//                         <div class="badge badge-soft badge-warning">${issue.labels[0]}</div>
//                         <div class="badge badge-soft badge-warning">${issue.labels[1]?issue.labels[1]:""}</div>
//                     </div>
//                     <hr class="text-gray-400">
//                     <div class="text-gray-400">
//                         <p>#1 by ${issue.author}</p>
//                         <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
//                     </div>
//                 </div>
//             </div>
//         `;
//         cardSection.appendChild(card);
//     }
// };
console.log(openData);
const displaydata=(issues)=>{

    
    openData=[];
    closedData=[];

    for(const issue of issues){

        if(issue.status === "open"){
            openData.push(issue);
        }else{
            closedData.push(issue);
        }

    }

    const cardSection = document.getElementById("card-section");
    cardSection.innerHTML="";

    for(const issue of issues){
        const card=document.createElement("div");
        card.innerHTML=`
             <div class="card w-70 h-70 bg-base-100 card-sm shadow-sm border-t-4 ${borderClass[issue.status]}">
                <div class="card-body">
                     <div class="flex justify-between">
                        <img src="${statusImg(issue)}" alt="">
                        <div class="badge badge-soft font-semibold ${priorityClasses[issue.priority]}">${issue.priority}</div>
                    </div>
                    <h2 class="card-title">${issue.title}</h2>
                    <p class="text-gray-400">${issue.description}</p>

                    <div>
                        <div class="badge badge-soft badge-warning">${issue.labels[0]}</div>
                        <div class="badge badge-soft badge-warning">${issue.labels[1] ? issue.labels[1] : ""}</div>
                    </div>

                    <hr class="text-gray-400">

                    <div class="text-gray-400">
                        <p>#1 by ${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>

                </div>
            </div>
        `;
        cardSection.appendChild(card);
    }
};



loadData();

