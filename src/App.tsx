import {
  RefineThemes,
  ThemedLayoutV2,
  notificationProvider
} from '@refinedev/chakra-ui'
import { Authenticated, ErrorComponent, Refine } from '@refinedev/core'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6'
import { dataProvider, liveProvider } from '@refinedev/supabase'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react'
import authProvider from './authProvider'
import { LoginPage } from './pages'
import { supabaseClient } from './utility'

import { ChakraUIInferencer } from '@refinedev/inferencer/chakra-ui'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <Refine
            authProvider={authProvider}
            dataProvider={dataProvider(supabaseClient)}
            liveProvider={liveProvider(supabaseClient)}
            notificationProvider={notificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: 'QwIWik-v6bZYI-AdQS2F'
            }}
            resources={[
              {
                create: '/codexes/create',
                edit: '/codexes/edit/:id',
                list: '/codexes',
                name: 'codexes',
                show: '/codexes/show/:id'
              },
              {
                create: '/units/create',
                edit: '/units/edit/:id',
                list: '/units',
                name: 'units',
                show: '/units/show/:id'
              }
            ]}
            routerProvider={routerBindings}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to='/login' />}>
                    <Outlet />
                  </Authenticated>
                }
              >
                <Route
                  element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource='codexes' />}
                  />
                  <Route path='codexes'>
                    <Route
                      index
                      element={<ChakraUIInferencer />}
                    />
                    <Route
                      path='show/:id'
                      element={<ChakraUIInferencer />}
                    />
                    <Route
                      path='edit/:id'
                      element={<ChakraUIInferencer />}
                    />
                    <Route
                      path='create'
                      element={<ChakraUIInferencer />}
                    />
                  </Route>
                  <Route path='units'>
                    <Route
                      index
                      element={<ChakraUIInferencer />}
                    />
                    <Route
                      path='show/:id'
                      element={<ChakraUIInferencer />}
                    />
                    <Route
                      path='edit/:id'
                      element={<ChakraUIInferencer />}
                    />
                    <Route
                      path='create'
                      element={<ChakraUIInferencer />}
                    />
                  </Route>
                  <Route
                    path='*'
                    element={<ErrorComponent />}
                  />
                </Route>
              </Route>
              <Route element={<Authenticated fallback={<Outlet />} />}>
                <Route
                  path='/login'
                  element={<LoginPage />}
                />
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
