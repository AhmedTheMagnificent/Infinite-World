import * as THREE from 'three'

export default function startGame(container) {
  if (!container) {
    console.warn('game: no container provided')
    return () => {}
  }

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio || 1)
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setClearColor(0x111111, 1)
  container.innerHTML = ''
  container.appendChild(renderer.domElement)

  // Scene + Camera
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  )
  camera.position.z = 3

  // Cube logic (encapsulated)
  const cube = createCube()
  scene.add(cube)

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambient)
  const dir = new THREE.DirectionalLight(0xffffff, 0.8)
  dir.position.set(5, 5, 5)
  scene.add(dir)

  let rafId = null
  let running = true

  function animate() {
    if (!running) return
    cube.rotation.x += 0.01
    cube.rotation.y += 0.013
    renderer.render(scene, camera)
    rafId = requestAnimationFrame(animate)
  }

  animate()

  function onResize() {
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  window.addEventListener('resize', onResize)

  // Return a cleanup function that stops animation and disposes resources
  return function stop() {
    running = false
    window.removeEventListener('resize', onResize)
    if (rafId) cancelAnimationFrame(rafId)
    // dispose geometry/material
    if (cube.geometry) cube.geometry.dispose()
    if (cube.material) {
      if (Array.isArray(cube.material)) {
        cube.material.forEach((m) => m.dispose && m.dispose())
      } else if (cube.material.dispose) {
        cube.material.dispose()
      }
    }
    // remove canvas
    if (renderer.domElement && renderer.domElement.parentNode === container) {
      container.removeChild(renderer.domElement)
    }
    // dispose renderer
    if (renderer.dispose) renderer.dispose()
  }
}

function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({ color: 0x44aa88 })
  const mesh = new THREE.Mesh(geometry, material)
  return mesh
}
