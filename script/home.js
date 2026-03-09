let allData=[];

const allBtn=document.getElementById("all-btn");
const openBtn=document.getElementById("open-btn");
const closedBtn=document.getElementById("closed-btn");

const loadingSpinner=document.getElementById("loading-spinner");

let countAll=document.getElementById("count");


// const loadData=()=>{
//     const url="https://phi-lab-server.vercel.app/api/v1/lab/issues";
//     fetch(url)
//     .then(res=>res.json())
//     .then(data=>displaydata(data.data));
// };
const loadData = async () => {

    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    const res = await fetch(url);
    const data = await res.json();
    //allData.push(data.data);
    allData=data.data;
    loadingSpinner.classList.add("hidden");
    displaydata(allData);

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
    }else if(issue.status==="closed"){
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


const displayModal=(cardId)=>{
    const cardDetails=document.getElementById("card-details");
    cardDetails.innerHTML=`
          <dialog id="issue-modal" class="modal modal-bottom sm:modal-middle">
            <div class="modal-box">
            <h3 class="text-lg font-bold">${cardId.title}</h3>
            <div class="flex gap-3">
                <div class="badge ${cardId.status==='open'?`badge-success`:`badge-error`} text-white rounded-full">${cardId.status==="open"?"Opened":"Closed"}</div>
                <p class="text-gray-500"> <span>${cardId.status==="open"?"Opened by":"Closed by"} </span>${cardId.author}</p>
                <p class="text-gray-500">${new Date(cardId.createdAt).toLocaleDateString()}</p>
            </div>
            <p class="py-4">${cardId.description}</p>
            <div class="bg-base-300 w-11/12 flex justify-between p-2 rounded-xl">
                <div><p class="text-gray-600">Assignee:</br><span class="font-bold text-md text-black">${cardId.author}</span></p></div>
                <div><p class="text-gray-600">Priority:</br><div class="badge ${priorityClasses[cardId.priority]} rounded-full">${cardId.priority}</div></p></div>
            </div>
            <div class="modal-action">
             <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
                </form>
                 </div>
            </div>
        </dialog>
    
    `;
    document.getElementById('issue-modal').showModal();
    console.log(cardId);
};


const displaydata=(issues)=>{

    countAll.innerText=issues.length;
   
    // for(const issue of issues){

    //     if(issue.status === "open"){
    //         openData.push(issue);
    //     }else if(issue.status === "closed"){
    //         closedData.push(issue);
    //     }

    // }

    const cardSection = document.getElementById("card-section");
    cardSection.innerHTML="";

    for(const issue of issues){
        const card=document.createElement("div");
        card.innerHTML=`
             <div class="card w-full h-70 bg-base-100 card-sm shadow-sm border-t-4 ${borderClass[issue.status]}">
                <div class="card-body">
                     <div class="flex justify-between">
                        <img src="${statusImg(issue)}" alt="">
                        <div class="badge badge-soft font-semibold ${priorityClasses[issue.priority]}">${issue.priority}</div>
                    </div>
                    <h2 class="card-title">${issue.title}</h2>
                    <p class="text-gray-400">${issue.description}</p>

                    <div>
                       ${issue.labels.map(label =>`<div class="badge badge-soft gap-1 badge-warning">${label}</div>`).join("")}
                    </div>

                    <hr class="text-gray-400">

                    <div class="text-gray-400">
                        <p>#${issue.id} by ${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>

                </div>
            </div>
        `;
        cardSection.appendChild(card);
        card.addEventListener("click",function(){
            displayModal(issue);
        });
    }
};

allBtn.addEventListener("click", ()=>{
    currentStates="all";
    switchTab("all");
    displaydata(allData);
});

openBtn.addEventListener("click", ()=>{
    currentStates="open";
    switchTab("open");
    const openIssues = allData.filter(
        issue => issue.status === "open"
    );

    displaydata(openIssues);
});

closedBtn.addEventListener("click", ()=>{
    currentStates="closed";
    switchTab("closed");
     const closedIssues = allData.filter(
        issue => issue.status === "closed"
    );

    displaydata(closedIssues);
});

loadData();

document.getElementById("search-btn").addEventListener("click",function(){
    const input=document.getElementById("input-btn");
    const search=input.value;

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues/")
    .then(res=>res.json())
    .then(data=>{
        const allSearch=data.data;
        const filterSearch=allSearch.filter((word)=>
            word.title.toLowerCase().includes(search)
        );
        displaydata(filterSearch);
    });

})
