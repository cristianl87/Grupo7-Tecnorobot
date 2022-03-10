let saludo= 'hola Mundo marino'

console.log(saludo)

window.addEventListener('load', function() {
    const form= document.querySelector('form')
    const nombre = document.querySelector('#name');
    const category  = document.querySelector('#category_id');
    const price  = document.querySelector('#price');
    //const currency  = document.querySelector('#currency_id');
    const file  = document.querySelector('#file');
    const gallery_file  = document.querySelector('#gallery_file');
    const description  = document.querySelector('#description');
    const button  = document.querySelector('#button');
    const ulErrors= document.querySelector('div.errors ul');

    form.addEventListener('submit',function(e){

        const errors =[]
        ulErrors.innerHTML = ""
       
       if (nombre.value == ''){
           errors.push ('el campo de nombre debe estar completo')
       }
       if (price.value == ''){
           errors.push ('el campo de precio debe estar completo')
       }
       if(errors.length > 0){
           e.preventDefault();
          
           for (let i = 0; i < errors.length; i ++){
               ulErrors.innerHTML += '<li>'+ errors[i]+ '</li>'
           }}

    })










   })
   