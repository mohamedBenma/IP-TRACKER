import { mount } from '@vue/test-utils'
import { vi, describe, test, expect, beforeEach } from 'vitest'
import App from './App.vue'

vi.mock('./components/Map.vue', () => ({
  default: {
    name: 'Map',
    props: ['lat', 'lang'],
    template: '<div class="mock-map">Mock Map</div>',
  },
}))

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
  vi.restoreAllMocks()
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    }),
  )
})

async function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

test('getOwnIp sets lat and passes props to children', async () => {
  const wrapper = mount(App)

  await flushPromises()
  await wrapper.vm.$nextTick()

  await wrapper.vm.getOwnIp()
  await flushPromises()
  await wrapper.vm.$nextTick()

  expect(wrapper.vm.lat).toBe(37.386)
  expect(wrapper.findComponent({ name: 'Map' }).props('lat')).toBe(37.386)
  expect(wrapper.findComponent({ name: 'IpData' }).props('ipData')).toEqual({
    success: true,
    ip: '8.8.8.8',
    city: 'Mountain View',
    region_code: 'CA',
    postal: '94043',
    latitude: 37.386,
    longitude: -122.0838,
    timezone: { utc: '-07:00' },
    connection: { isp: 'Google LLC' },
  })
})

test('renders App component', () => {
  const wrapper = mount(App)
  expect(wrapper.exists()).toBe(true)
})
