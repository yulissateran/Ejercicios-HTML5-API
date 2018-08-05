const notify = () => {
  const properties ={
    body:'Tienes un visitante nuevo',
    requireInteraction: true,
    icon: 'notification.png',
    vibrate: window.navigator.vibrate([200, 100, 200]),
  }
  if (Notification.permission === 'granted') {
    const notification =   new Notification('Comunal', properties);
     notification.onclick =(event)=>{
          event.preventDefault();
          window.open('https://developer.mozilla.org/en-US/docs/Web/API/notification');
        };
  } else if (Notification.permission === 'default') {
    Notification.requestPermission((permission) => {
      if (Notification.permission === 'granted') {
     const notification =   new Notification('Comunal', properties);
     notification.onclick =(event)=>{
          event.preventDefault();
          window.open('https://developer.mozilla.org/en-US/docs/Web/API/notification');
        };
      }
    });

  } else {
    alert('por favor desbloquea las notificaciones');
  }
}

// window.onload = ()=>{
//   setTimeout(notify, 10000);
// };

document.getElementById('button').addEventListener('click', notify);