import { ExpiredHeader } from '../ExpiredHeader'
import renderer from 'react-test-renderer'
import Navigation from "../../navigation"
import { fireEvent, render } from '@testing-library/react-native'

jest.useFakeTimers()

it('renders correctly', () => {
    const tree = renderer.create(
      <Navigation>
        <ExpiredHeader/>
      </Navigation>
    )
    expect(tree).toMatchSnapshot()
  })

  