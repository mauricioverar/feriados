$(document).ready(function(){
    var flag=0
    $('form').on('submit', (event)=>{
        event.preventDefault()

        let mes = document.getElementById('mes').value
                
        consulta(mes)
    })

    let consulta = (mes) =>{

        $.ajax({
            dataType:"json",
            type:"get",
            url:`https://www.feriadosapp.com/api/holidays.json`,
            success: function(datos) {
                let datosApi = datos.data
                var texto = "<tr><th>Fecha</th><th>Motivo</th><th>Tipo</th></tr>"
                for (var i = 0; i < datosApi.length; i++){
                    var fecha=datosApi[i].date
                    var motivo=datosApi[i].title
                    var tipo=datosApi[i].extra

                    var arreglo=fecha.split('-')
                    
                    if (arreglo[0] == 2020){
                        
                        if (arreglo[1] == mes){
                            //console.log(flag)
                            //flag++

                            texto += `<tr>
                                        <td>${datosApi[i].date}</td>
                                        <td>${datosApi[i].title}</td>
                                        <td>${datosApi[i].extra}</td>
                                    </tr>`                           
                        }
                    }
                }
                document.getElementById("cuerpo-tabla").innerHTML = texto;
            },
            error: function(error) {
                console.log(error)
            }            
        })
    }    
})
