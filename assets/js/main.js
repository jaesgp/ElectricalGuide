// assets/js/main.js

// 1) Load and parse your CSV
Papa.parse('/data/components.csv', {
  download: true,
  header: true,
  skipEmptyLines: true,
  complete: results => {
    // Normalize fields into a JS-friendly format
    const components = results.data.map(row => ({
      id:              row['Component ID'],
      name:            row['Component'],
      module:          row['Module'],
      plc:             row['PLC Address'],
      area:            row['Area'],
      cableId:         row['Cable ID'],
      carriageWiring:  row['Carriage Terminal Wiring'],
      cabinetWiring:   row['To Cabinet']
    }));
    renderComponents(components);
  }
});

// 2) Create cards grouped by Area
function renderComponents(components) {
  const container = document.getElementById('component-list');
  container.innerHTML = '';

  // Find unique areas
  const areas = [...new Set(components.map(c => c.area))];
  areas.forEach(area => {
    // Section header
    const section = document.createElement('div');
    section.className = 'mb-8';
    section.innerHTML = `<h2 class="text-2xl font-semibold mb-4">${area}</h2>`;

    // Grid for this area
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

    // Add a card for each component in this area
    components
      .filter(c => c.area === area)
      .forEach(c => {
        const card = document.createElement('div');
        card.className = 'bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer';
        card.onclick = () => showDetails(c);
        card.innerHTML = `
          <h3 class="text-xl font-semibold">${c.name}</h3>
          <p class="text-gray-600">Module: ${c.module}</p>
          <p class="text-gray-600">PLC Address: ${c.plc}</p>
          <p class="text-gray-600">Cable ID: ${c.cableId}</p>
        `;
        grid.appendChild(card);
      });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// 3) Show details in modal
function showDetails(c) {
  document.getElementById('component-id').textContent     = `${c.id} – ${c.name}`;
  document.getEle
