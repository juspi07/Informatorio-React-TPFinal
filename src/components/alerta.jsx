import '../css/alerta.css'






export default function Alerta (aux) {
    return(
        <div style={{marginTop:70, backgroundColor:aux.color}} class="alert">
            <span class="closebtn">&times;</span>
            {aux.aux}
        </div>
    )
  }