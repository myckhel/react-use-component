import React, {useEffect, useRef, forwardRef, memo} from 'react'

import { useComponent } from 'react-use-component'

const App = (props) => {
  const reUseRef = useRef()
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
    setTimeout(() => reUseRef.current.method(), 8000)
  }, [])

  console.log({reUseRef});
  return (
    <div>
      <div>Create React Library Example 😄</div>
      <Reuse active ref={reUseRef} />
    </div>
  )
}

const Reuse = memo(forwardRef((props, ref) => {
  const self = useComponent({
    props,
    state: {
      abc: 'xyz',
    },
    method: () => {
      console.log('method');
      return 'method'
    }
  })

  if (ref) {
    ref.current = self
  }

  return (
    <div>{self.state.abc}</div>
  )
}))

export default App
