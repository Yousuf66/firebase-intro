const caffeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
//use .where() for queries
//eg .where('city','==','karachi')
//use .orderBy() to order the incomming data
//eg .orderBy('city')

//db.collection('caffe').where('city','==','karachi').orderBy('name').get()


// db.collection('caffe').get().then((snapshot)=>{
//     snapshot.docs.forEach((doc) => {
        
//         renderCafe(doc);
//     });
// })

//realtime
db.collection('caffe').orderBy('name').onSnapshot((snapshot)=>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){
            renderCafe(change.doc);

        }else if(change.type=='removed'){
            let li = caffeList.querySelector('[data-id='+change.doc.id+']');
            caffeList.removeChild(li);
        }
        
    });
});

function renderCafe(doc){

    let li = document.createElement('li');
    let name  = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);
    caffeList.appendChild(li);
   li.appendChild(cross);
    cross.textContent = 'x';

    
    cross.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('caffe').doc(id).delete();
        e.stopPropagation();
    });
}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('caffe').add({'name':form.name.value,
                                 'city':form.city.value
                           });
    form.city.value='';
    form.name.value='';
});

/*
to update data use 

db.collection('caffe').doc(data-id).update({
    name: "new name",
    city: "new city"
});
 */