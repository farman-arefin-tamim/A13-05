const loadData=()=>{
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
    .then(res=>res.json())
    .then(data=>displaydata(data.data));
};

// const status=(issue)=>{
//     if(issue.status=="open"){

//     }
// };


const displaydata=(issues)=>{
    const cardSection = document.getElementById("card-section");
    cardSection.innerHTML="";

    for(const issue of issues){
        const card=document.createElement("div");
        card.innerHTML=`
             <div class="card w-70 bg-base-100 card-sm shadow-sm border-t-4 border-green-700">
                <div class="card-body">
                     <div class="flex justify-between">
                        <img src="./assets/${issue.status=='open'?'Open-status.png':'Closed-status.png'}" alt="">
                        <div class="badge badge-soft font-light">Low</div>
                    </div>
                    <h2 class="card-title">Fix Navigation Menu On Mobile Devices</h2>
                    <p class="text-gray-400">The navigation menu doesn't collapse properly on mobile devices...</p>

                    <div>
                        <div class="badge badge-soft badge-error">Error</div>
                        <div class="badge badge-soft badge-warning">Warning</div>
                    </div>
                    <hr class="text-gray-400">
                    <div class="text-gray-400">
                        <p>#1 by john_doe</p>
                        <p>1/15/2024</p>
                    </div>
                </div>
            </div>
        `;
        cardSection.appendChild(card);
    }
};

loadData();