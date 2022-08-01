import { Poll } from '../Poll'
import renderer from 'react-test-renderer'
import Navigation from "../../navigation"
import { fireEvent, render } from '@testing-library/react-native'

jest.useFakeTimers()


it('renders correctly', () => {

    const tree = renderer.create(
        <Navigation>
            <Poll data = {
                {  
                "category": "Politics",
                "choice": 2,
                "created_at": "2022-07-19T20:33:49",
                "description": "Prime Minister Lee Hsien Loong said on Saturday (Apr 16) that whether he or the new leader of the PAP's fourth-generation (4G) team, Finance Minister Lawrence Wong, will lead the ruling party in the next general election is a decision to be made later.escription",
                "expired": false,
                "image": "https://onecms-res.cloudinary.com/image/upload/s--ScJ71BRc--/c_fill%2Cg_auto%2Ch_468%2Cw_830/f_auto%2Cq_auto/mtf-covid-19-virtual-press-conference-mar-31--2020--2-.png?itok=LCdl2abN",
                "question": "Will Lawrence Wong lead the next General Elections?",
                "question_id": 2,
                }
            }/>
        </Navigation>
    )

    expect(tree).toMatchSnapshot()
  })
