import { MainLayout } from "./MainLayout.jsx";

export function AccountSettings(props) {
    return (
        <div>
            <h2>Account settings</h2>
            <label>
                Username <input onChange={props.setUserName}/>
            </label>
            <p><i>Changes are auto-saved.</i></p>
        </div>
    );
}
