import './main.css';
import { draw, N_elementary_cellular_automata } from './lib/cellular_automata'
 
draw({
    target:'render',
    true_color:'red',
    false_color:'green',
    render_row_interval: 60,
    rule: N_elementary_cellular_automata
});
