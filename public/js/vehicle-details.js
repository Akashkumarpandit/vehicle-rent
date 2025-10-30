import { api } from './common.js'

// Static vehicles list (same as in vehicles.js)
const SUGGESTIONS = [
  { _id: 'static-1', make: 'BMW', model: '3 Series', year: 2022, type: 'Car', pricePerDay: 95, imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop', features: ['Leather seats', 'Sunroof', 'Navigation'] },
  { _id: 'static-2', make: 'Mercedes-Benz', model: 'C-Class', year: 2021, type: 'Car', pricePerDay: 110, imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop', features: ['Premium sound', 'Heated seats', 'Bluetooth'] },
  { _id: 'static-3', make: 'Audi', model: 'A4', year: 2020, type: 'Car', pricePerDay: 99, imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop', features: ['Quattro AWD', 'LED lights', 'Parking sensors'] },
  { _id: 'static-4', make: 'Tesla', model: 'Model 3', year: 2022, type: 'Car', pricePerDay: 130, imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop', features: ['Autopilot', 'Electric', 'Long range'] },
  { _id: 'static-5', make: 'Toyota', model: 'Camry', year: 2021, type: 'Car', pricePerDay: 70, imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop', features: ['Reliable', 'Fuel efficient', 'Spacious'] },
  { _id: 'static-6', make: 'Ford', model: 'Mustang', year: 2023, type: 'Car', pricePerDay: 120, imageUrl: 'https://cdn.pixabay.com/photo/2018/11/17/18/58/shelby-3821716_1280.jpg', features: ['V8 engine', 'Sports mode', 'Racing seats'] },
  { _id: 'static-7', make: 'Honda', model: 'CBR500R', year: 2023, type: 'Bike', pricePerDay: 45, imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop', features: ['Sport bike', 'ABS', 'Lightweight'] },
  { _id: 'static-8', make: 'Yamaha', model: 'MT-07', year: 2022, type: 'Bike', pricePerDay: 50, imageUrl: 'https://cdn.pixabay.com/photo/2021/01/06/12/32/yamaha-5894293_1280.jpg', features: ['Naked bike', 'Torque', 'Agile'] },
  { _id: 'static-9', make: 'Kawasaki', model: 'Z400', year: 2023, type: 'Bike', pricePerDay: 70, imageUrl: 'https://cdn.pixabay.com/photo/2017/10/05/14/38/motorcycle-2819604_1280.jpg', features: ['Beginner friendly', 'Responsive', 'Stylish'] },
  { _id: 'static-10', make: 'BMW', model: 'G310R', year: 2022, type: 'Bike', pricePerDay: 42, imageUrl: 'https://cdn.pixabay.com/photo/2020/06/25/06/14/motorcycle-5338695_1280.jpg', features: ['Entry level', 'Fuel efficient', 'Easy handling'] }
]

const LUXURY = [
  { _id: 'luxury-1', make: 'Rolls-Royce', model: 'Phantom', year: 2022, type: 'Luxury', pricePerDay: 800, imageUrl: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&h=600&fit=crop', features: ['Ultra luxury', 'Chauffeur available', 'Premium interior'] },
  { _id: 'luxury-2', make: 'Lamborghini', model: 'Aventador', year: 2021, type: 'Luxury', pricePerDay: 900, imageUrl: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&h=600&fit=crop', features: ['V12 engine', 'Exotic', 'Head turner'] },
  { _id: 'luxury-3', make: 'Porsche', model: '911 Carrera', year: 2022, type: 'Luxury', pricePerDay: 650, imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop', features: ['Sports car', 'Precision handling', 'Iconic design'] },
  { _id: 'luxury-4', make: 'Ferrari', model: '488 GTB', year: 2020, type: 'Luxury', pricePerDay: 950, imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop', features: ['Italian supercar', 'Turbocharged', 'Track ready'] },
  { _id: 'luxury-5', make: 'bugatti', model: 'cheron', year: 2019, type: 'Luxury', pricePerDay: 1500, imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop', features: ['Hypercar', 'Extreme speed', 'Limited edition'] },
  { _id: 'luxury-6', make: 'Bentley', model: 'Continental GT', year: 2021, type: 'Luxury', pricePerDay: 700, imageUrl: 'https://cdn.pixabay.com/photo/2014/11/24/23/48/bentley-544739_1280.jpg', features: ['Grand tourer', 'Handcrafted', 'Luxury comfort'] },
  { _id: 'luxury-7', make: 'Land Rover', model: 'Defender', year: 2023, type: 'Luxury', pricePerDay: 400, imageUrl: 'https://cdn.pixabay.com/photo/2017/04/20/10/37/range-rover-2245376_1280.jpg', features: ['Off-road capable', 'Premium SUV', 'Adventure ready'] },
  { _id: 'luxury-8', make: 'Kawasaki', model: 'Ninja H2', year: 2023, type: 'Luxury Bike', pricePerDay: 250, imageUrl: 'https://cdn.pixabay.com/photo/2021/04/19/05/12/kawasaki-ninja-h2r-6190256_1280.jpg', features: ['Supercharged', 'Race technology', 'Fastest ninja'] },
  { _id: 'luxury-9', make: 'Suzuki', model: 'Hayabusa', year: 2022, type: 'Luxury Bike', pricePerDay: 220, imageUrl: 'https://cdn.pixabay.com/photo/2015/03/15/05/28/suzuki-674060_1280.jpg', features: ['Speed legend', 'Aerodynamic', 'Powerful'] },
  { _id: 'luxury-10', make: 'BMW', model: 'S1000RR', year: 2023, type: 'Luxury Bike', pricePerDay: 280, imageUrl: 'https://cdn.pixabay.com/photo/2017/07/09/12/03/bmw-2486777_1280.jpg', features: ['Superbike', 'Track proven', 'Advanced electronics'] },
  { _id: 'luxury-11', make: 'Ducati', model: 'Panigale V4', year: 2023, type: 'Luxury Bike', pricePerDay: 300, imageUrl: 'https://cdn.pixabay.com/photo/2017/04/19/14/35/ducati-2242487_1280.jpg', features: ['V4 engine', 'Italian racing', 'MotoGP technology'] },
  { _id: 'luxury-12', make: 'Yamaha', model: 'YZF-R1', year: 2022, type: 'Luxury Bike', pricePerDay: 240, imageUrl: 'https://cdn.pixabay.com/photo/2020/04/10/14/58/motorcycle-5026152_1280.jpg', features: ['Crossplane engine', 'Supersport', 'Rider aids'] }
]

function getVehicleById(id) {
  const all = [...SUGGESTIONS, ...LUXURY]
  return all.find(v => v._id === id)
}

function renderVehicle(vehicle) {
  if (!vehicle) {
    document.getElementById('vehicle-content').innerHTML = '<p>Vehicle not found.</p>'
    return
  }

  const img = vehicle.imageUrl || 'https://via.placeholder.com/800x600/333/fff?text=Vehicle'
  const features = vehicle.features || []
  
  document.getElementById('vehicle-content').innerHTML = `
    <div class="detail-grid">
      <div>
        <img src="${img}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image" />
      </div>
      
      <div class="vehicle-info">
        <div>
          <h1 class="vehicle-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</h1>
          <p class="vehicle-meta">${vehicle.type || 'Vehicle'}</p>
        </div>

        <div class="price-section">
          <div class="price-label">Price per day</div>
          <div class="price-value">$${vehicle.pricePerDay}</div>
        </div>

        ${features.length > 0 ? `
          <div>
            <h3 style="margin-bottom: 0.5rem;">Features</h3>
            <ul class="features-list">
              ${features.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>
        ` : ''}

        <div class="booking-section">
          <h3>Book this vehicle</h3>
          <div class="date-inputs">
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Start Date</label>
              <input type="date" id="start-date" min="${new Date().toISOString().split('T')[0]}" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">End Date</label>
              <input type="date" id="end-date" min="${new Date().toISOString().split('T')[0]}" />
            </div>
          </div>
          <button id="proceed-payment" class="btn primary" style="width: 100%; padding: 1rem; font-size: 1.1rem; margin-top: 1rem;">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  `

  // Add event listener for payment button
  document.getElementById('proceed-payment').addEventListener('click', () => {
    const startDate = document.getElementById('start-date').value
    const endDate = document.getElementById('end-date').value

    if (!startDate || !endDate) {
      alert('Please select both start and end dates')
      return
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert('End date must be after start date')
      return
    }

    // Calculate number of days
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))
    const totalPrice = days * vehicle.pricePerDay

    // Navigate to payment with vehicle details
    const params = new URLSearchParams({
      vehicleId: vehicle._id,
      vehicleName: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      startDate,
      endDate,
      days,
      pricePerDay: vehicle.pricePerDay,
      totalPrice
    })
    location.href = `/payments/?${params.toString()}`
  })
}

async function main() {
  const params = new URLSearchParams(location.search)
  const vehicleId = params.get('id')

  if (!vehicleId) {
    document.getElementById('vehicle-content').innerHTML = '<p>No vehicle specified.</p>'
    return
  }

  // Try to find from static list first
  let vehicle = getVehicleById(vehicleId)

  // If not found in static list, try API (for real database vehicles)
  if (!vehicle) {
    try {
      const vehicles = await api('/api/vehicles')
      vehicle = vehicles.find(v => v._id === vehicleId)
      if (vehicle && !vehicle.features) {
        vehicle.features = ['Available for rent']
      }
    } catch (e) {
      console.error('Error fetching from API:', e)
    }
  }

  renderVehicle(vehicle)
}

document.addEventListener('DOMContentLoaded', main)
