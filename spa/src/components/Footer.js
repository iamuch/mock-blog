import logo from '../images/logo-w.svg';
import ScrollTop from '../components/ScrollTop';

export default function Footer() {
    return (
        <div className="App-footer">
            <div className="App-footer-header">
                <img alt="" src={logo} />
                <p>サンプルテキストサンプル ルテキストサンプルテキストサンプルテキス
                    <br/>トサンプル ルテキスト
                </p>
                <ScrollTop></ScrollTop>
            </div>
            <div className="App-footer-copyright">
                <p>Copyright©2007-2019 Blog Inc.</p>
            </div>
        </div>
    )
}