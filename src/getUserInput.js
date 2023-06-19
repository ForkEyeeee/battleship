function getValues() {
  const carrierInput = document.getElementById('carrier-input').value;
  const battleShipInput = document.getElementById('battleship-input').value;
  const destroyerInput = document.getElementById('destroyer-input').value;
  const submarineInput = document.getElementById('submarine-input').value;
  const frigateInput = document.getElementById('frigate-input').value;

  const valuesArray = [
    carrierInput,
    battleShipInput,
    destroyerInput,
    submarineInput,
    frigateInput,
  ];

  const convertedArray = valuesArray.map((str) => str.split(',').map(Number));

  const carrierPosition = document.getElementById('carrier-horizontal').checked
    ? document.getElementById('carrier-horizontal').value
    : document.getElementById('carrier-vertical').value;

  const battleShipPosition = document.getElementById('battleship-horizontal')
    .checked
    ? document.getElementById('battleship-horizontal').value
    : document.getElementById('battleship-vertical').value;

  const destroyerPosition = document.getElementById('destroyer-horizontal')
    .checked
    ? document.getElementById('destroyer-horizontal').value
    : document.getElementById('destroyer-vertical').value;

  const submarinePosition = document.getElementById('submarine-horizontal')
    .checked
    ? document.getElementById('submarine-horizontal').value
    : document.getElementById('submarine-vertical').value;

  const frigatePosition = document.getElementById('frigate-horizontal').checked
    ? document.getElementById('frigate-horizontal').value
    : document.getElementById('frigate-vertical').value;

  return {
    convertedArray,
    carrierPosition,
    battleShipPosition,
    destroyerPosition,
    submarinePosition,
    frigatePosition,
  };
}

export default getValues;
