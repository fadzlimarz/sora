'use client'

import {useWeatherContext} from '@/components/WeatherProvider'
import {
  ActionIcon,
  Flex,
  Modal,
  Stack,
  Switch,
  useMantineColorScheme
} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import {IconSettings} from '@tabler/icons-react'
import {useState} from 'react'

/**
 * Settings component.
 */
export default function Settings() {
  const [opened, {open, close}] = useDisclosure(false)
  const {colorScheme, toggleColorScheme} = useMantineColorScheme()
  const {tempUnit, setTempUnit} = useWeatherContext()
  const [checked, setChecked] = useState(tempUnit === 'f' ? true : false)

  function toggleTempUnit() {
    setChecked(!checked)
    setTempUnit(checked ? 'c' : 'f')
  }

  return (
    <>
      <ActionIcon
        aria-label="open settings"
        onClick={open}
        size="md"
        variant="transparent"
      >
        <IconSettings size={36} />
      </ActionIcon>
      <Modal
        closeButtonProps={{'aria-label': 'close settings'}}
        onClose={close}
        opened={opened}
        padding="xl"
        title="Settings"
      >
        <Stack justify="space-between">
          <Switch
            aria-label="Toggle between light and theme."
            label="Dark Theme"
            checked={colorScheme === 'dark'}
            offLabel="OFF"
            onChange={() => toggleColorScheme()}
            onLabel="ON"
            size="md"
          />
          <Switch
            aria-label="Toggle between Fahrenheit and Celsius"
            label="Fahrenheit"
            checked={checked}
            offLabel="OFF"
            onChange={() => toggleTempUnit()}
            onLabel="ON"
            size="md"
          />
          <Flex
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          ></Flex>
        </Stack>
      </Modal>
    </>
  )
}
