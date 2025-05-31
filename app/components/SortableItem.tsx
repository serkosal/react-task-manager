import {useSortable} from '@dnd-kit/react/sortable';


export function SortableItem({id, index, children}: any) {
    const {ref} = useSortable({id, index});

    return (
        <div ref={ref} className="Dragable">{children}</div>
    );
}