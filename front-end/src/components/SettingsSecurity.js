import Card from "react-bootstrap/Card";
import CardBody from "react-bootstrap/esm/CardBody";
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SettingsCard = (props) => {

    return (
        <>
            <Card className="settings-card">
                <Card.Title>Security</Card.Title>
                <Card.Subtitle>Change Password</Card.Subtitle>
                <Card.Body>
                    
                    <Form style={{ textAlign: 'left' }}>
                        <Form.Group controlId="SecEmail" className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type = "email" placeholder="something@example.com"/>
                        </Form.Group>

                        <Form.Group controlId="SecPassOld" className="mb-3">
                            <Form.Label >Current Password</Form.Label>
                            <Form.Control type = "password" placeholder="Enter your current password" />
                        </Form.Group>

                        <Form.Group controlId="SecPassNew1" className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type = "password" placeholder="Enter a new password" />
                        </Form.Group>

                        <Form.Group controlId="SecPassNew2" className="mb-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type = "password" placeholder="Repeat new password" />
                        </Form.Group>

                        <Button className="login-button" variant="primary" type="submit">
                             Submit
                        </Button>


                    </Form>
                </Card.Body>
            </Card>
        </>
    )

}

export default SettingsCard;