(function(w,d,s,u,p){
  if(!p){return;}
  if(w.snaptr){
    return;
  }
  var tr=w.snaptr=function(){
    tr.handleRequest?tr.handleRequest.apply(tr,arguments):tr.queue.push(arguments);
  };
  tr.queue=[];
  var sdk=d.createElement(s);
  sdk.async=true;
  sdk.src=u;
  var first=d.getElementsByTagName(s)[0];
  if(first&&first.parentNode){
    first.parentNode.insertBefore(sdk,first);
  }else{
    (d.head||d.documentElement).appendChild(sdk);
  }
  tr('init', p, {});  tr('track', 'PAGE_VIEW');
})(window, document, 'script', 'https://sc-static.net/scevent.min.js', "372a238f-da08-46db-b16b-4f19539ec634");