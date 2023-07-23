$(document).ready(function() {
  const showDataClients = $("#clientsData");
  const clientsCardContainer = $("#data-clients__container");
  const generalData = $("#clients-general-data");

  const getDeadDate = (date) => {
    const year = date?.toString()?.slice(0, -6);
    return Number(year) + 73;
  };

  const getClientsData = () => {
    db.collection("clientes")
      .get()
      .then((querySnapshot) => {
        clientsCardContainer.empty();
        querySnapshot.forEach((doc) => {
          const clientCard = $("<div class='data-clients___card'></div>");
          clientCard.html(`
            <p class="data-clients__name">Nombre: <span>${doc?.data().firstName}</span></p>
            <p class="data-clients__last-name">Apellido: <span>${doc?.data().lastName}</span></p>
            <p class="data-clients__age">Edad: <span>${doc?.data().age}</span></p>
            <p class="data-clients__birthday">Fecha de nacimiento: <span>${doc?.data().birthday}</span></p>
            <p class="data-clients__birthday">Fecha probable muerte: <span>${getDeadDate(doc?.data().birthday)} </span></p>
          `);
          clientsCardContainer.append(clientCard);
        });
      });
  };

  showDataClients.click(function() {
    clientsCardContainer.empty();
    getClientsData();
    showDataClients.text('Actualizar lista');
  });

  const getStandardDeviation = (numberAges) => {
    const sum = numberAges?.reduce((acc, val) => acc + val, 0);
    const prom = sum / numberAges?.length;
    const dif = numberAges?.map((val) => Math.pow(val - prom, 2));
    const sumDif = dif.reduce((acc, val) => acc + val, 0);
    const promDif = sumDif / numberAges?.length;
    const standardDeviation = Math.sqrt(promDif);
    return standardDeviation;
  };

  const getAges = () => {
    let average = 0;

    db.collection("clientes")
      .get()
      .then((querySnapshot) => {
        let clientsAges = [];
        let numberAges = [];

        querySnapshot.forEach((doc) => {
          clientsAges.push(doc?.data().age);
        });
        clientsAges?.map((age) => numberAges?.push(Number(age)));
        average = numberAges?.reduce((a, b) => a + b, 0) / numberAges?.length;

        const deviation = getStandardDeviation(numberAges);

        generalData.html(`
          <p class="clients-general-data__average">Promedio edad: <span>${average?.toFixed(2)} años</span></p>
          <p class="clients-general-data__standard">Desviación estándar: <span>${deviation?.toFixed(2)}</span></p>
          <p class="clients-general-data__live">Esperanza de vida mundial:  <span>73,4 años</span></p>
        `);
      });
  };

  getAges();
});