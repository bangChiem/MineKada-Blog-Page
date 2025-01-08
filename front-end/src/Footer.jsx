export default function Footer(){
    return(
        <footer className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-md-4">
                    <img src="dirt-block.png"></img>
                    <h2>Minekada Blog Page</h2>
                    <p> This blog is an unofficial blog page for Minecraft by Mojang and Microsoft.</p>
                    <p>Check out Minecraft click below:</p>
                    <a href="https://www.minecraft.net/en-us" target="_blank">
                        <button>Visit Minecraft Page</button>
                    </a>
                    <div className="footer-div-seperator"></div>
                </div>

                <div className="col-xs-12 col-md-4">
                    <img id="bkad-logo" src="bluebkadlogo.png"></img>
                    <h2>Special Thanks</h2>
                    <p>I want to thank TCNJ’s Barkada for the inspiration to create this website.</p>
                    <p>Please check out their website!</p>
                    <a href="https://www.tcnjbarkada.com/" target="_blank">
                        <button>Visit Barkada Page</button>
                    </a>
                    <div className="footer-div-seperator"></div>
                </div>

                <div className="col-xs-12 col-md-4">
                    <img src="Bang-logo.png"></img>
                    <h2>Thank you for using my website!</h2>
                    <p>Let me know about any bugs with the page! Also check out my other projects!</p>
                    <p>To contact me email: bangchiem40@gmail.com</p>
                    <a href="https://bangchiem.github.io/MyLandingPage/" target="_blank">
                        <button>Visit my website</button>
                    </a>
                    <div className="footer-div-seperator"></div>
                </div>
            </div>
        </footer>
    )
}