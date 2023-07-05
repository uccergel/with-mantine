import { Box, NavLink } from '@mantine/core'

export default function Header() {
  return (
    <Box w={240} className="flex flex-row text-center">
      <NavLink href="/" label="Ana Sayfa" />
      <NavLink
        component="ListPage"
        href="/personal-info"
        label="Kişisel Bilgiler"
      />
      <NavLink
        href="/personal-performance"
        label="Bireysel Performans"
        childrenOffset={28}
      >
        <NavLink href="/" label="Kişisel Bilgiler" />
        <NavLink
          href="/performance/monthly-performance"
          label="Aylık Performans"
        />
        <NavLink href="/performance/shift" label="Vardiya" />
        <NavLink href="/performance/survey-and-test" label="Test|Sınav" />
        <NavLink href="/performance/manager-opinion" label="Yönetici Görüşü" />
      </NavLink>
    </Box>
  )
}
