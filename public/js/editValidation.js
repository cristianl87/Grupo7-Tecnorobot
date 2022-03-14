let saludo= 'hola Mundo'

console.log(saludo)

window.addEventListener('load', function() {
    const form= document.querySelector('form')
    const nombre = document.querySelector('#name');
    const category  = document.querySelector('#category_id');
    const price  = document.querySelector('#price');
    //const currency  = document.querySelector('#currency_id');
    const file  = document.querySelector('#file');
    const galleryfile  = document.querySelector('#gallery');
    const description  = document.querySelector('#description');
    const button  = document.querySelector('#buttonEdit');
    const ulErrores= document.querySelector('#errores');

    button.addEventListener('click',function(e){
        
        const errores =[]
        ulErrores.innerHTML = ""
        const clasesAlert = ["border", "border-danger"];
       
        if (nombre.value == ''){
            errores.push ('El campo de nombre de producto tiene que estar completo')
            nombre.classList.add(...clasesAlert);
            
        }else if (nombre.value.length < 5) {
         errores.push("El campo de nombre de producto debe tener al menos 5 caracteres")
     }else {
         nombre.classList.remove(...clasesAlert);
       }
        if (price.value == ''){
            errores.push ('El campo de precio debe estar completo')
            price.classList.add(...clasesAlert);
        }else {
         price.classList.remove(...clasesAlert);
       }
 
     
    if (description.value.length < 20) {
         errores.push("El campo descripcion debe tener al menos 20 caracteres");
         description.classList.add(...clasesAlert);
     }else {
         description.classList.remove(...clasesAlert);
       }
     
    if (file.value == "") {
        errores.push("Se debe seleccionar una imagen")
        file.classList.add(...clasesAlert);
    } else if (!/(.jpg|.jpeg|.png|.gif)$/i.exec(file.value)) {
        errores.push("La imagen debe ser JPG, JPEG, PNG, GIF")
    }else {
        file.classList.remove(...clasesAlert);
      }
    if (galleryfile.value == "") {
        errores.push("Se debe seleccionar una imagen")
        galleryfile.classList.add(...clasesAlert);
    } else if (!/(.jpg|.jpeg|.png|.gif)$/i.exec(galleryfile.value)) {
        errores.push("La imagen debe ser JPG, JPEG, PNG, GIF")
    }else {
        galleryfile.classList.remove(...clasesAlert);
      }
   
     

       if(errores.length > 0){
           
          e.preventDefault()
           for (let i = 0; i < errores.length; i ++){
               ulErrores.innerHTML += '<li>'+ errores[i]+ '</li>'


               
           }}

    })










   })
