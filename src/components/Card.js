//js imports
import { TextFile, CarouselImages, LogoFile } from './FileImport';
import { Form } from './Form';
import { Socials } from './Socials';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

//css imports
import '../css/Card.css';

/**
 * @param {string}  [id]          - The id
 * @param {boolean}  datanav      - Set to exclude from nav by default
 * @param {string}  [cardClasses] - Pass through classes to put on the returned text file
 * 
 * @param {string}   cardType     - The card type. Must be 'text', 'carousel' or 'logo'
 * @param {string}  [cardBody]    - If cardType = 'text', the file to be loaded into the cards body. Returned as raw data, html used for minor formatting (i.e. <br>)
 * @param {string}  [projTitle]   - If cardType = 'project', defines the project Title. This will be used to find and access the directory with assets for the slideshow, modal, and card Body in the stead of the cardBody prop
 * @param {string}  [btnLink]     - Add a btnPrimary to the card
 * @param {string}  [btnText]     - Add the text for the btnLink
 * @param {string}  [secLink]     - Add a second btnPrimary to the card
 * @param {string}  [secLinkText] - Add the text for the secLink
 *  
 * @returns A Card Component
*/

function Card({id, datanav, cardClasses, cardType, cardBody, projTitle, btnLink, btnText, secLink, secLinkText}) {
    switch(cardType){
        case 'text':
            if(cardClasses){
                cardClasses += " px-3";
            }else{
                cardClasses = "px-3";
            }
        
            if(btnLink){
                if(secLink){
                    return(
                        <article id={id} datanav={`${datanav}`}>
                            <h2 className="h2" >About Me</h2>
                            <TextFile className={cardClasses} fileName={'./text/'+cardBody} /> 
                            <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={btnLink}>{btnText}</a>
                            <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={secLink}>{secLinkText}</a>
                        </article>
                    )
                }else{
                    return(
                        <article id={id} datanav={`${datanav}`}>
                            <h2 className="h2" >About Me</h2>
                            <TextFile className={cardClasses} fileName={'./text/'+cardBody} /> 
                            <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={btnLink}>{btnText}</a>
                        </article>
                    )
                }
            }
            return(
                <article id={id} datanav={datanav}>
                    <h2 className="h2" >About Me</h2>
                    <TextFile className={cardClasses} fileName={'./text/'+cardBody} /> 
                </article>
            );
            break;
        case 'carousel':
            var directoryName = projTitle.replace(/\s/g, '');
            var uid           = uuid();
            var cardId        = "card-"+uid.slice(0,4);
            
            if(cardClasses){
                cardClasses += " projCard mt-3";
            }else{
                cardClasses = "projCard mt-3";
            }
            if(btnLink){
                if(secLink){
                    return(
                        <section className={"row flex-row-reverse " + cardClasses} id={cardId} datanav={`${datanav}`}>
                            <div className="projDesc col">
                                <h3 className="h3">{projTitle}</h3>
                                <TextFile fileName={"projects/"+directoryName+"/"+directoryName} />
                                <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={btnLink}>{btnText}</a>
                                <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={secLink}>{secLinkText}</a>
                            </div>
                            <CarouselImages projTitle={directoryName} uid={cardId+"-carousel"} />
                        </section>
                    );
                }else{
                    return(
                        <section className={"row flex-row-reverse " + cardClasses} id={cardId} datanav={`${datanav}`}>
                            <div className="projDesc col">
                                <h3 className="h3">{projTitle}</h3>
                                <TextFile fileName={"projects/"+directoryName+"/"+directoryName} />
                                <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={btnLink}>{btnText}</a>
                            </div>
                            <CarouselImages projTitle={directoryName} uid={cardId+"-carousel"} />
                        </section>
                    );
                }
            }else{
                return(
                    <section className={"row flex-row-reverse " + cardClasses} id={cardId} datanav={`${datanav}`}>
                        <div className="projDesc col">
                            <h3 className="h3">{projTitle}</h3>
                            <TextFile fileName={"projects/"+directoryName+"/"+directoryName} />
                        </div>
                        <CarouselImages projTitle={directoryName} uid={cardId+"-carousel"} />
                    </section>
                );
            }
            break;   
        case 'logo':
            var directoryName = projTitle.replace(/\s/g, '');
            
            if(cardClasses){
                cardClasses += " projCard mt-3";
            }else{
                cardClasses = "projCard mt-3";
            }
            if(btnLink){
                
                if(secLink){
                    return(
                        <section className={"row flex-row " + cardClasses} id={id} datanav={`${datanav}`}>
                            <div className="projDesc col">
                                <h3 className="h3">{projTitle}</h3>
                                <TextFile fileName={"projects/"+directoryName+"/"+directoryName} />
                                <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={btnLink}>{btnText}</a>
                                <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={secLink}>{secLinkText}</a>
                            </div>
                            <div className="projImg py-3">   
                                <LogoFile projTitle={directoryName}/>
                            </div>
                        </section>
                    );
                }else{
                    return(
                        <section className={"row flex-row " + cardClasses} id={id} datanav={`${datanav}`}>
                            <div className="projDesc col">
                                <h3 className="h3">{projTitle}</h3>
                                <TextFile fileName={"projects/"+directoryName+"/"+directoryName} />
                                <a className='btn btn-primary my-3' target="_blank" rel="noopener noreferrer" href={btnLink}>{btnText}</a>
                            </div>
                            <div className="projImg py-3">   
                                <LogoFile projTitle={directoryName}/>
                            </div>
                        </section>
                    );
                }
            }else{
                return(
                    <section className={"row flex-row " + cardClasses} id={id} datanav={`${datanav}`}>
                        <div className="projDesc col">
                            <h3 className="h3">{projTitle}</h3>
                            <TextFile fileName={"projects/"+directoryName+"/"+directoryName} />
                        </div>
                        <div className="projImg py-3">   
                            <LogoFile projTitle={directoryName}/>
                        </div>
                    </section>
                );
            }

            
            break;
        case 'contact':
            if(cardClasses){
                cardClasses += " row my-3 contact";
            }else{
                cardClasses = " row my-3 contact";
            }

            return(
                <article id={id} datanav={`${datanav}`}>
                    <h2 className='h2'>Contact Me</h2>
                    <p>If you want to contact me, feel free to fill out the form below, or check out my socials!</p>
                    <section className={cardClasses} id={id} datanav={`${datanav}`}>
                        <Form className="col" />
                        <Socials className="col" />
                    </section>
                </article>
            );
            break;
        }
}

Card.defaultProps = {
    datanav: false
}

Card.propTypes = {
    id: PropTypes.string,
    datanav: PropTypes.bool.isRequired,
    cardClasses: PropTypes.string,
    cardType: PropTypes.string.isRequired,
    cardBody: PropTypes.string,
    projTitle: PropTypes.string,
    btnLink: PropTypes.string,
    secLink: PropTypes.string,
    secLinkText: PropTypes.string
}

export default Card;