let saludo= 'hola Mundo '

console.log(saludo)

window.addEventListener('load', function() {
    const form= document.querySelector('form')
    const nombre = document.querySelector('#name');
    const category  = document.querySelector('#category_id');
    const price  = document.querySelector('#price');
    //const currency  = document.querySelector('#currency_id');
    const file  = document.querySelector('#file');
    const galleryfile  = document.querySelector('#gallery_file');
    const description  = document.querySelector('#description');
    const button  = document.querySelector('#button');
    const ulErrors= document.querySelector('div.errors ul');

    button.addEventListener('click',function(e){
        
        const errors =[]
        ulErrors.innerHTML = ""
        const clasesAlert = ["border", "border-danger"];
       
       if (nombre.value == ''){
           errors.push ('El campo de nombre de producto tiene que estar completo')
           nombre.classList.add(...clasesAlert);
           
       }else if (nombre.value.length < 5) {
        errors.push("El campo de nombre de producto debe tener al menos 5 caracteres")
    }else {
        nombre.classList.remove(...clasesAlert);
      }
       if (price.value == ''){
           errors.push ('El campo de precio debe estar completo')
           price.classList.add(...clasesAlert);
       }else {
        price.classList.remove(...clasesAlert);
      }

    
   if (description.value.length < 20) {
        errors.push("El campo descripcion debe tener al menos 20 caracteres");
        description.classList.add(...clasesAlert);
    }else {
        description.classList.remove(...clasesAlert);
      }
    if (category .value == "") {
        errors.push("Debes elegir una categoria");
        category .classList.add(...clasesAlert);
    } else {
        category.classList.remove(...clasesAlert);
      }
    if (file.value == "") {
        errors.push("Se debe seleccionar una imagen")
        file.classList.add(...clasesAlert);
    } else if (!/(.jpg|.jpeg|.png|.gif)$/i.exec(file.value)) {
        errors.push("La imagen debe ser JPG, JPEG, PNG, GIF")
    }else {
        file.classList.remove(...clasesAlert);
      }
    if (galleryfile.value == "") {
        errors.push("Se debe seleccionar una imagen")
        galleryfile.classList.add(...clasesAlert);
    } else if (!/(.jpg|.jpeg|.png|.gif)$/i.exec(galleryfile.value)) {
        errors.push("La imagen debe ser JPG, JPEG, PNG, GIF")
    }else {
        galleryfile.classList.remove(...clasesAlert);
      }

       if(errors.length > 0){
           
          e.preventDefault()
           for (let i = 0; i < errors.length; i ++){
               ulErrors.innerHTML += '<li>'+ errors[i]+ '</li>'


               
           }}

    })










   })
