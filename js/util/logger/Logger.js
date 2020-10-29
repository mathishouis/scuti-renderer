export function Log(message, background='black') {
    
    var today = new Date();
    var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    var dateTime = date+' - '+time;
     switch (background) {
         case 'success':  
              background = '#74ED7B'
              break
         case 'info':     
              background = '#3F6FFB'  
              break;
         case 'error':   
              background = '#E86C5D'   
              break;
         case 'warning':  
              background = '#FFD100' 
              break;
         default: 
              background = background
     }

     console.log(`%c ${dateTime} | ${message} `, `background: ${background};`)
    
}