var dateTime = function(){
    var date  = new Date();
    // console.log(date.getTime())

    //超时
    // if(localStorage.getItem("innertime")==null){
    //     var start = localStorage.setItem("innertime",date.getTime()) 
    // }else{
    //     var end = date.getTime();
    //     var start = Number(localStorage.getItem("innertime"));
    //     var setall = 1000*10*60;
    //     var all = end - start;
    //     if(all>setall){
    //         localStorage.removeItem('user')
    //         localStorage.removeItem("innertime")
    //         this.$router.push('/login')
    //         return
    //     }else{
    //         localStorage.setItem("innertime",end)
    //     }
    // }
        

    var y = date.getFullYear(); 

    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  

    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;

    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;

    var min = date.getMinutes();
    min = min < 10 ? ('0' + min) : min;

    var s = date.getSeconds(); 
    s = s < 10 ? ('0' + s) : s;

    return y + '-' + m + '-' + d + " " + h + ":" + min + ":" + s ;  
}

export default dateTime;