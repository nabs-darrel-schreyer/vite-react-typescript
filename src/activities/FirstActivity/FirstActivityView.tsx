import {useContext} from 'react';
import {FirstActivityContext} from '../ActivityContext';
import useSWR from 'swr';
import { fetcher } from './FirstActivityViewModel';
import type { FirstActivityData } from './FirstActivityViewModel';

function FirstActivityView() {

    const viewModel = useContext(FirstActivityContext);
    const { data, error, isLoading } = useSWR<FirstActivityData[]>(
        '/api/first-activity',
        fetcher
    );

    return (
        <div>
            <h1>{viewModel.title}</h1>
            
            <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                <h2>SWR Data Status:</h2>
                {isLoading && <p>Loading data...</p>}
                {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
                {data && (
                    <div>
                        <h3>Data loaded successfully!</h3>
                        <ul>
                            {data.map(item => (
                                <li key={item.id}>
                                    <strong>ID:</strong> {item.id} - <strong>Name:</strong> {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            <p>lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. In obcaecati error facilis eaque blanditiis ullam saepe perferendis, repellendus deserunt reprehenderit distinctio quod sapiente molestiae dolorem sunt! Dicta saepe architecto placeat aut quos iste ad reprehenderit officiis, adipisci unde? Fugit consectetur sint doloremque aspernatur. Molestias, ipsa? Doloremque, molestiae? Dolorem ex magni expedita corrupti dolores? Facilis magnam ipsam placeat aperiam voluptatem? Voluptatibus repellendus fugit velit ullam accusamus nostrum, dolorum quos quidem voluptatum perspiciatis dolor est, dolorem optio iusto quas tempora praesentium porro asperiores doloremque obcaecati corporis. Cum doloribus saepe laboriosam a eligendi suscipit est, error libero! Necessitatibus, nam! Deserunt minus ipsum dicta est! Deserunt commodi impedit provident vero obcaecati! Laudantium consequuntur ut dolorum harum hic ex laboriosam, quo nisi eius aut, at distinctio natus placeat rem cum dolore repellat voluptates exercitationem perspiciatis nulla commodi beatae omnis! Excepturi, iste dignissimos tempore odio in harum necessitatibus atque quod quibusdam aperiam nemo. Dolore, iusto. Esse iure architecto similique eum ad, labore natus eaque, dolor, dolorem voluptatum cum. Soluta quo autem sunt tempora neque dolor, vitae nisi, laboriosam blanditiis iure odit aspernatur fuga quaerat praesentium odio obcaecati temporibus deleniti reiciendis veniam magni. Deserunt commodi assumenda ut mollitia magni ipsam neque sint ex. Aut odio ad dignissimos ratione, totam, quod maiores assumenda id cum illum minus quis, voluptate cumque perspiciatis. Reiciendis atque ex ratione sit neque consequuntur velit eos a consequatur maxime facere blanditiis quidem eaque repellendus alias, tempora nisi officia nostrum. Consequatur minus quibusdam temporibus pariatur atque magnam placeat? Cum, explicabo amet quidem fugiat quisquam veniam voluptates velit, rem quia quo tenetur ad inventore obcaecati debitis repudiandae. Quam qui ratione dignissimos illo consequuntur id saepe repellat illum placeat sapiente debitis deserunt veniam quae voluptatibus dolor labore porro nisi animi soluta iusto fugiat eos ex, dicta mollitia. Adipisci, cumque hic! Quasi temporibus cumque voluptatum architecto, dolorem reprehenderit.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe voluptate porro deleniti sit veniam quibusdam, ratione est dolorum dolores incidunt, aperiam quaerat accusamus necessitatibus voluptas? Aliquam, illum qui. Nihil beatae placeat impedit laboriosam fugiat doloremque reiciendis architecto, pariatur repellat totam neque corrupti suscipit accusamus doloribus officia libero facilis blanditiis, vitae autem, delectus ipsum consequuntur. Voluptas error nostrum temporibus quos officiis quae ratione totam nam reiciendis iure, tenetur non, delectus ipsum placeat quisquam vero saepe ab possimus magnam a debitis esse. Soluta nulla repellat architecto aliquam quod molestias rerum explicabo ullam! Voluptatem ipsa vel, odio eos laboriosam necessitatibus eum error quisquam facere quo enim iste, excepturi suscipit. Voluptatibus rem hic accusantium atque fugiat distinctio saepe magni officiis, commodi sed facilis incidunt corrupti aperiam blanditiis vero voluptatem nulla labore nesciunt impedit sapiente inventore eligendi qui temporibus sit. Repellat, rerum dicta dolorum quod deserunt, magni placeat numquam eligendi aperiam explicabo pariatur voluptates sunt culpa totam? Quasi delectus eius rem ipsa enim, quam nisi est ea dolores mollitia molestiae ab cumque. Corporis temporibus fugiat accusamus magnam. Pariatur error asperiores quidem corporis nam necessitatibus earum incidunt, aut ullam, sit consequuntur animi! Esse quaerat aspernatur accusamus reprehenderit quos? Placeat voluptatum ipsam hic sed consequatur ullam omnis similique quas veniam, magnam, dolorum nisi in nesciunt ad illo vel dignissimos unde esse labore distinctio molestias rerum? Rem saepe distinctio eius. Architecto voluptates assumenda nostrum ex, delectus cumque sequi nemo?</p>
        </div>
    );
}

export default FirstActivityView;