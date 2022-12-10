import { Avatar } from './Avatar';
import styles from './Comment.module.css';
import { Trash, ThumbsUp } from "phosphor-react";


export function Comment({ content, onDeleteComment }) {

    function handleDeleteComment() {
        onDeleteComment(content);
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/bonieasy.png" />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Ariele Bonifacio</strong>
                            <time title='07 de Dezembro às 08:13h' dateTime="2022-12-07">Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title="delete comment">
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button>
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}