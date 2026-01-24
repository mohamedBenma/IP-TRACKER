import { mount } from '@vue/test-utils'
import { vi, describe, test, expect, beforeEach } from 'vitest'
import App from './App.vue'
//Mock app component to avoid loading leaflet and other heavy dependencies
vi.mock('./components/Map.vue', () => ({
  default: {
    name: 'Map',
    props: ['lat', 'lang'],
    template: '<div class="mock-map">Mock Map</div>',
  },
}))
//Mock IpData component
vi.mock('./components/IpData.vue', () => ({
  default: {
    name: 'IpData',
    props: ['ipData'],
    template: '<div class="mock-ipdata">Mock IpData</div>',
  },
}))
const mockResponse = {
  success: true,
  ip: '8.8.8.8',
  city: 'Mountain View',
  region_code: 'CA',
  postal: '94043',
  latitude: 37.386,
  longitude: -122.0838,
  timezone: { utc: '-07:00' },
  connection: { isp: 'Google LLC' },
}
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          ip: '8.8.8.8',
          city: 'Mountain View',
          region_code: 'CA',
          postal: '94043',
          latitude: 37.386,
          longitude: -122.0838,
          timezone: { utc: '-07:00' },
          connection: { isp: 'Google LLC' },
        }),
    }),
  )
})
const wrapper = mount(App)
const spy = vi.spyOn(wrapper.vm, 'getOwnIp')
await wrapper.find('img').trigger('click')
expect(spy).toHaveBeenCalled()

await wrapper.vm.getOwnIp()
await wrapper.vm.$nextTick()
expect(wrapper.vm.lat).toBe(37.386)
expect(wrapper.findComponent({ name: 'Map' }).props('lat')).toBe(37.386)
expect(wrapper.findComponent({ name: 'IpData' }).props('ipData')).toEqual({
  ip: '8.8.8.8',
  city: 'Mountain View',
  region_code: 'CA',
  postal: '94043',
  latitude: 37.386,
  longitude: -122.0838,
  timezone: { utc: '-07:00' },
  connection: { isp: 'Google LLC' },
})

test('renders App component', () => {
  const wrapper = mount(App)

  expect(wrapper.exists()).toBe(true)
})
