// @refresh reload
import { mount, StartClient } from "@solidjs/start/client"
import { upgradeThemedSvgImages } from "@dev-centr/themed-svg/runtime"

export default function client() {
  const dispose = mount(() => <StartClient />, document.getElementById("app")!)
  const upgrade = () => upgradeThemedSvgImages()
  queueMicrotask(upgrade)

  const observer = new MutationObserver(upgrade)
  observer.observe(document.body, { childList: true, subtree: true })

  return () => {
    observer.disconnect()
    dispose()
  }
}
