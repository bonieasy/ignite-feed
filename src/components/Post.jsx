import { format, formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export function Post({ author, publishedAt, content }) {

    const [comments, setComments] = useState([
        'Post Muito bacana!'
    ])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'")

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        addSuffix: true,
    })

    function handleCreateNewComment() {
        event.preventDefault() //Previne que ocorra evento padrao.

        const newCommentText = event.target.comment.value
        // EVENT = SUBMIT
        // TARGET = QUEM DISPAROU O EVENTO (NESSE CASO O FORM)
        // COMMENT - NOME DO COMPONENTE DENTRO DO FORM QUE EU QUERO PEGAR (PODERIA SER O USER, IDADE, QQ COISA)
        // VALUE = A PROPRIEDADE DO ELEMENTO COMMENT QUE EU QUERO PEGAR (PODERIA SER O CLASSNAME, ID, PLACEHOLDER, ETC)

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange () {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid() {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteComment(commentToDelete) {
        //console.log(`deletar comentario ${comment}`)
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        })

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0;
    
    return(
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarURL} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeToNow}</time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        return <p>{line.content}</p>;
                    } else if (line.type === 'link') {
                        return <p><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>
            <form onAbort="{handleCleanEvent}" onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
               
                <textarea
                    name='comment'
                    placeholder="Deixe um comentário"
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Comentar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {comments.map(comment => {
                    return <Comment content={comment} onDeleteComment={deleteComment} />
                })}
            </div>
        </article>
            );
        }