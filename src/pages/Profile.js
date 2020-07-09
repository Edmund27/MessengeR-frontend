import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { postPicture } from "../store/user/actions"
import { showMessageWithTimeout } from "../store/appState/actions"
import { selectUser } from "../store/user/selectors";


export default function Profile() {
    const [imageUrl, setImageUrl] = useState('');
    const [inputUsername, setInputUsername] = useState('')
    const [editMode, setEditMode] = useState(false);
    const currentUser = useSelector(selectUser);
    const dispatch = useDispatch();

    const submit = (e) => {
        e.preventDefault()
        if (imageUrl === '' & inputUsername === '') {
            dispatch(showMessageWithTimeout("danger", false, "You did not fill in new username or profile picture Url"))
        } else {
            dispatch(postPicture(imageUrl, inputUsername))
            setImageUrl('')
            setInputUsername('')
            setEditMode(false)
        }
    }
    const editingRender =
        <div>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Profile picture Url</Form.Label>
                <Form.Control
                    onChange={event => setImageUrl(event.target.value)}
                    type="text"
                    placeholder="Enter the image URL"
                    required
                    value={imageUrl}
                />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>New Username</Form.Label>
                <Form.Control
                    onChange={event => setInputUsername(event.target.value)}
                    type="text"
                    placeholder="Enter new username"
                    required
                    value={inputUsername}
                />
            </Form.Group>
            <Form.Group className="mt-5">
                <Button variant="primary" type="submit" onClick={submit}>
                    Submit
</Button>
            </Form.Group>
        </div>

    const noEditingRender = <div>
        <Form.Group className="mt-5">
            <Button variant="primary" type="submit" onClick={event => setEditMode(true)}>
                Edit Profile
          </Button>
        </Form.Group>
    </div>

    const editModeToggle = editMode ? editingRender : noEditingRender

    return (
        <Container>
            <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
                <h1 className="mt-5 mb-5"> {`Welcome ${currentUser.name}`}</h1>
                <img
                    src={currentUser.imageUrl}
                    alt="alternatetext"
                    width="200" height="200"
                >
                </img>
                {editModeToggle}
            </Form>
        </Container>
    );
}

