import { useEffect, useState } from "react";
import { getMenu } from "./api";

const Menu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        FetchMenu();
    }, []);

    const FetchMenu = async () => {
        try {
            const response = await getMenu();
            setMenu(response.data);
        } catch (err) {
            console.error('Error fetching menu:', err);
        }
    };

    return (
        <div>
            <h1>Menu</h1>
            <ul>
                {menu.map((item) => (
                    <li key={item.id}>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                        <p>Price: ${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
