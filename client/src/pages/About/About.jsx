import Mapping from '../../components/Mapping/Mapping'
import './About.css'

const About = ()=>{
    return (
        <div className='Wrap'>
            <h3 className='About_h3'>ABOUT</h3>
            <div id='About_Wrap' className="Wrap About_Wrap">
                <p>We, establish for the purpose to contribute a part of the quality items worldwide, especially to whom engage for a plant which is related with Condensor, Boiler, Air-conditioner, Air Fin-cooler, Heat Exchanger fabricator.<br /><br />
                Please enjoy any material here and You can find the Qualified Tube expanders, Beveling-machine, Expanding-machine on time through our seasoned experiences.<br /><br />
                We are waiting you and hope that we have related with long-term connection of you.</p>
                <p className='About_p1'>Yours,</p>
                <p className='About_p2'>B.Y. KIM</p>
                <p className='About_p2'>CEO, TK-TRADE</p>
                <p className='About_line'></p>
            </div>
            <Mapping />
            {/* <a className='CatalogsBtn' href="/reference">View All Catalogs <span>〉</span></a> */}
        </div>              
    ) 
}
export default About          