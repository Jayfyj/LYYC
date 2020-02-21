var ajax = function (type,params,RES,ERR,url) {
//   console.log(window.navigator.userAgent)
  
//   var that = this;

//   if (window.navigator.userAgent.indexOf("Android")!=-1) {
//     var levelNum = window.navigator.userAgent.split("Android ")
//     console.log(parseInt(levelNum[1]))
//     if(parseInt(levelNum[1]) <= 4){
//       that.myModal.levelModal(that)
//     }
//   }
  
  if(url!=''&&url!=undefined){
    url = url;
  }else{
    //同一入口
    url = "../B2CMainPlat_13_CGH";
  }
  if(localStorage.getItem("gtid")==null || localStorage.getItem("gtid")== "undefined" || localStorage.getItem("gtid")== undefined){
    localStorage.setItem("gtid","")
  }
  if(localStorage.getItem("token")==null || localStorage.getItem("token") == "undefined" || localStorage.getItem("token") == undefined){
    localStorage.setItem("token","")
  }

  var txttime =  this.datetime()
  console.log(txttime)
  //必须传的参数
  var origin = {
    "chn_no":"21",  //渠道号
    "gtype":"20",  // 单位类型
    "gtid": localStorage.getItem("gtid"),     //单位id，用户id
    "token":localStorage.getItem("token"),    //访问凭证
    "txtime":txttime    //交易时间
  }
  var newParams ={}
  //合并
  Object.assign(newParams,origin,params);
  //get请求
  if(type == "get"){
    this.$axios({
      method:type,
      url:url,
      params:newParams,
      //超时时间
      timeout: 1000 * 10,
    }).then(res=>{
    //   console.log(typeof(res.data))
      RES(res);
    }).catch(err=>{

      ERR(err);
    });
  }
}
export default ajax;
