fetch('https://cors-anywhere.herokuapp.com/https://api.phish.net/v3/setlists/recent?apikey=F0D95586CE5BFDDB30E0', {
  mode: 'cors',
  headers: {
    Origin: window.location
  }
})
  .then(data => data.json())
  .then(json => {
    const todaysShow = json.response.data.filter(show => show.relative_date === 'Today')[0];
    const show = json.response.data.filter(show => show.relative_date !== 'Today')[0];

    if (!show) return;

    let didPlaySetYourSoulFreeToday = false;

    if (todaysShow) {
      didPlaySetYourSoulFreeToday = /set\-your\-soul\-free/.test(todaysShow.setlistdata);
    }

    const didPlaySetYourSoulFree = /set\-your\-soul\-free/.test(show.setlistdata);

    if (didPlaySetYourSoulFreeToday) {
      document.body.classList.add('faster')
      window.content.innerHTML = 'IT WAS PLAYED TODAY! GET OUT YOUR MOONSHINE IT\'S PARTY TIME!'
      window.content.setAttribute('didPlaySetYourSoulFreeToday', true);

      return;
    }

    // is it on the table?
    window.content.innerHTML = (didPlaySetYourSoulFree ? 'IT was played last show. FUCK YEAH!' : 'Hell Yes IT Is.');
    window.content.setAttribute('didPlaySetYourSoulFree', didPlaySetYourSoulFree);
  });
