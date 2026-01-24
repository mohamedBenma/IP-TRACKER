import { test } from 'vitest'
import IpData from './IpData.vue'
import { mount } from '@vue/test-utils'

test('renders IpData component', () => {
  const wrapper = mount(IpData)
  expect(wrapper.exists()).toBe(true)
})
describe('IpDAta.vue', () => {
  const MockData = {
    ip: '122.122.33.11',
    city: 'Béjaia',
    region_code: 'Toudja',
    postal: '06030',
    timezone: { utc: '+00:00' },
    connection: { isp: 'Mobilis' },
  }
  test('display location data correctly', () => {
    const wrapper = mount(IpData, {
      props: {
        ipData: MockData,
      },
    })
    expect(wrapper.text()).toContain('122.122.33.11')
    expect(wrapper.text()).toContain('Béjaia')
    expect(wrapper.text()).toContain('Toudja')
    expect(wrapper.text()).toContain('06030')
  })
  test('display timezone and isp correctly', () => {
    const wrapper = mount(IpData, {
      props: {
        ipData: MockData,
      },
    })
    expect(wrapper.text()).toContain('+00:00')
    expect(wrapper.text()).toContain('Mobilis')
  })
  test('get right number of boxes', () => {
    const wrapper = mount(IpData, {
      props: {
        ipData: MockData,
      },
    })
    expect(wrapper.findAll('.box').length).toBe(4)
  })
  test('doesnt crash if data is null', () => {
    const wrapper = mount(IpData, {
      props: {
        ipData: null,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
})
