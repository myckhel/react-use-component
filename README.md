# react-use-component

> React functional component as a class component

[![NPM](https://img.shields.io/npm/v/react-use-component.svg)](https://www.npmjs.com/package/react-use-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Overview
Package created to lean the use of `useCallback` and `useMemo` in functional component.
It allows you to use functional `Component` as if you are using a class `Component`

## Install

```bash
npm install --save react-use-component
Or
yarn add use-react-component
```

## Object Usage

```jsx
import React, {useEffect, useRef, forwardRef, memo} from 'react'

import { useComponent } from 'react-use-component'

const App = (props) => {
  const reUseRef = useRef()
  const self = useComponent({
    props,
    constructor: () => {
      self.age = 100
      self.logInit()
      console.log({self});
    },
    state: {
      abc: 'def',
    },
    logInit: () => {
      console.log('initialized');
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
    setTimeout(() => self.updateMe('Johnny'), 8000)
    setTimeout(() => reUseRef.current.method(), 8000)
  }, [])

  console.log({reUseRef});
  return (
    <div>
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

```

## Class Usage

```jsx
const _class = useComponent(new class {
  constructor() {
    console.log(this.ref)
  }
  something = () => {
    return 1 + 2
  }
  ref = 'ref string'
})

useEffect(() => {
  console.log(_class.something())
  setTimeout(() => _class.setState({newValue: 2}), 6000)
}, [])

return (
  <div>
    <button onClick={_class.setState(({number}) => ({number: number + 1}))}>{_class.state.number}</button>
  </div>
)
```

## License

MIT © [myckhel](https://github.com/myckhel)
