import React, {useEffect} from 'react'

import { useComponent } from 'react-use-component'

const App = (props) => {
  const self = useComponent({
    props,
    state: {
      abc: 'def',
    },
    getState: () => {
      console.log(self.state)
      return self.state
    },
    updateMe: (update) => {
      self.me = update || 'Mike'
      self.getState()
      console.log('self', self);
    }
  })

  useEffect(() => {
    setTimeout(() => self.setState((s) => ({...s, value: 2})), 2000)
    setTimeout(() => self.getState(), 4000)
    setTimeout(() => self.updateMe(), 6000)
    setTimeout(() => self.updateMe('Johnny'), 8000)
  }, [])

  console.log(self);
  return <div>Create React Library Example 😄</div>
}

export default App
