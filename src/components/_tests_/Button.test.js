import { CircleButton, RectButton, ProfileButton } from "../Button";
import renderer from 'react-test-renderer'
import { fireEvent, render } from '@testing-library/react-native'

jest.useFakeTimers()

it('renders correctly', () => {
    const tree = renderer.create(<CircleButton />)
    const tree2 = renderer.create(<RectButton />)
    const tree3 = renderer.create(<ProfileButton />)
    expect(tree).toMatchSnapshot()
    expect(tree2).toMatchSnapshot()
    expect(tree3).toMatchSnapshot()
  })

  it('on press circle button', () => {
    const mockOnPressFn = jest.fn()
    const { getByTestId } = render(<CircleButton handlePress={mockOnPressFn} />)
    fireEvent.press(getByTestId('circle'))
    expect(mockOnPressFn).toHaveBeenCalled()
  })

  it('on press rect button', () => {
    const mockOnPressFn = jest.fn()
    const { getByTestId } = render(<RectButton handlePress={mockOnPressFn} />)
    fireEvent.press(getByTestId('rect'))
    expect(mockOnPressFn).toHaveBeenCalled()
  })

  it('on press profile button', () => {
    const mockOnPressFn = jest.fn()
    const { getByTestId } = render(<ProfileButton handlePress={mockOnPressFn} />)
    fireEvent.press(getByTestId('profile'))
    expect(mockOnPressFn).toHaveBeenCalled()
  })