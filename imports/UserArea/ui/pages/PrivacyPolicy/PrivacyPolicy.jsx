import React, {Component} from 'react';
import {
    Button,
    Grid,
    Row,
    Col,
    Glyphicon,
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';
import {Meteor} from 'meteor/meteor';
import Layout from '../../components/Layout.jsx';

if (Meteor.isClient) {
    // require('./Landing.scss');
}
export default class PrivacyPolicy extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <Row componentClass="section" className="privacy-policy-section">
                    <Col xs={12}>
                        <Grid className="">
                            <h2>Privacy Policy</h2>
                            <h3><a/>Data </h3>
                            <p>We collect personal and activity data, which may be linked. We use technologies like
                                cookies (small files stored on your browser), web beacons, or unique device identifiers
                                to identify your computer or device so we can deliver a better experience. Our
                                systems also log information like your browser, operating system and IP address.We also
                                may collect personally identifiable information that you provide to us, such as your
                                name, address, phone number or email address. With your permission, we may also
                                access other personal information on your device, such as your phone book, calendar or
                                messages, in order to provide services to you. If authorized by you, we may also access
                                profile and other information from services like Facebook.Our systems may
                                associate this personal information with your activities in the course of providing
                                service to you (such as pages you view or things you click on or search for).We do not
                                knowingly contact or collect personal information from children under 13. If you
                                believe we have inadvertently collected such information, please contact us so we can
                                promptly obtain parental consent or remove the information. </p>

                            <h3>Location </h3>
                            <p>We collect or share your location only with permission. In serving you, we may use or
                                store your precise geographic location, if you give us permission to do so. We do not
                                use or share this data for any other purpose. Many devices will indicate through
                                an icon when location services are operating. We only share this location information
                                with others as approved by you. </p>

                            <h3>Access </h3>
                            <p>You can request to see your personal data. You can sign into your account to see any
                                personally identifiable information we have stored, such as your name, email, address or
                                phone number. You can also contact us by email to request to see this information.</p>
                            <h3>Deletion</h3>
                            <p>We keep personal data until you delete it. We remove personally identifiable information
                                (such as your name, address, email or phone number) and other preferences associated
                                with your account promptly after you delete your account. We may retain other
                                data indefinitely.</p>

                            <h3>Sharing</h3>
                            <p>You control whether we share personal data with partners. We may share personally
                                identifiable information (such as name, address, email or phone) with trusted partners
                                in order to provide you with relevant advertising, offers or services. Contact us
                                if you want to opt-out of this sharing:</p>
                            <p>crashassist.app OR <a
                                href="mailto:julian.kingman@gmail.com">julian.kingman@gmail.com</a></p>
                            <p>102 Charles St, Boston, MA 02114 </p>

                            <p>California residents are legally entitled (at no charge and no more than once annually)
                                to request information about how we may have shared your information with others for
                                direct marketing purposes. Contact us for this information: </p>
                            <p>crashassist.app OR <a
                                href="mailto:julian.kingman@gmail.com">julian.kingman@gmail.com</a></p>
                            <p>102 Charles St, Boston, MA 02114</p>

                            <h3>Ad Tracking </h3>
                            <p>No ad companies collect data through our service. We do not allow advertising companies
                                to collect data through our service for ad targeting.</p>

                            <h3>Contact</h3>
                            <p>You can ask privacy questions. If you have any questions or concerns about our privacy
                                policies, please contact us:</p>
                            <p>crashassist.app OR <a
                                href="mailto:julian.kingman@gmail.com">julian.kingman@gmail.com</a></p>
                            <p>102 Charles St, Boston, MA 02114 </p>

                            <h3>Vendors </h3>
                            <p>Service providers access data on our behalf. In order to serve you, we may share your
                                personal and anonymous information with other companies, including vendors and
                                contractors. Their use of information is limited to these purposes, and subject to
                                agreements
                                that require them to keep the information confidential. Our vendors provide assurance
                                that they take reasonable steps to safeguard the data they hold on our behalf, although
                                data security cannot be guaranteed.Analytics companies may access anonymous
                                data (such as your IP address or device ID) to help us understand how our services are
                                used. They use this data solely on our behalf. They do not share it except in aggregate
                                form; no data is shared as to any individual user. Click to see company privacy
                                policies that govern their use of data. (none currently) </p>

                            <h3>Security </h3>
                            <p>We take detailed steps to protect personal information. We take reasonable
                                administrative, physical and electronic measures designed to safeguard and protect your
                                information from unauthorized access or disclosure. This includes utilizing Secure
                                Sockets
                                Layer (SSL) software, which encrypts the personal information you input, and storing
                                your information in encrypted form behind a firewall designed to block access from
                                outside our network. However, no security or encryption method can be guaranteed
                                to protect information from hackers or human error.Information we collect may be stored
                                or processed on computers located in any country where we do business. </p>

                            <h3>Special </h3>
                            <p>Special situations may require disclosure of your data. To operate the service, we also
                                may make identifiable and anonymous information available to third parties in these
                                limited circumstances: (1) with your express consent, (2) when we have a good
                                faith belief it is required by law, (3) when we have a good faith belief it is necessary
                                to protect our rights or property, or (4) to any successor or purchaser in a merger,
                                acquisition, liquidation, dissolution or sale of assets. Your consent will
                                not be required for disclosure in these cases, but we will attempt to notify you, to the
                                extent permitted by law to do so. </p>

                            <h3>More </h3>
                            <p>You can review more privacy-related information. This privacy policy was last updated on
                                10/21/16. Our privacy policy may change from time to time. If we make any material
                                changes to our policies, we will place a prominent notice on our website or application.
                                If the change materially affects registered users, we will send a notice to you by
                                email, push notification or text.</p>
                        </Grid>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
