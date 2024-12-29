import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { forwardRef, useEffect } from 'react'
import { getSafeBasePathUrl } from '../utils'

const modelUrl = getSafeBasePathUrl('/outer_douplet.glb')

const OuterDoubletModel = forwardRef(({ position, rotation, ...props }, ref) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { nodes, materials } = useGLTF(modelUrl)
  materials.material_0.depthWrite = true
  materials.material_0.metalness = 0
  materials.material_0.roughness = 1
  materials.material_0.transparent = true

  console.debug('OuterDoubletModel', materials.material_0)

  return (
    <group {...props} position={position} dispose={null} rotation={[0, rotation, 0]}>
      <mesh
        scale={0.055}
        castShadow
        receiveShadow
        ref={ref}
        geometry={nodes.outer_douplet.geometry}
        material={materials.material_0}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
})

useGLTF.preload(modelUrl)

export default OuterDoubletModel
