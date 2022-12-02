import {
    Avatar,
    Box,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Stack,
    Typography,
} from "@mui/material"
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import {styled} from '@mui/material/styles';
import {useEffect, useRef, useState} from "react";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import RenameChat from "./RenameChat";

const Chat = (props: {
    messages: any,
}) => {
    const {messages} = props;

    const Item = styled(Typography)(({theme}) => ({
        backgroundColor: '#283f5a',
        maxWidth: 500,
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: 'gray',
        marginLeft: 15,
        marginRight: 15
    }));

    const [username] = useLocalStorage('username');
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState(false);
    const scrollRef = useRef<any>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({behaviour: "smooth"});
        }
    }, [messages]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function editLongOneWord(inputStringArr: string) {
        let word: string = '';
        const stringArr = inputStringArr.split(" ");
        stringArr.forEach((e) => {
            if (e.length > 54) {
                let wordArr = e.split('');
                wordArr.forEach((e, index) => {
                    if (index === 54) {
                        word += ` ${e}`
                    } else {
                        word += e
                    }
                })
            } else {
                word += `${e} `
            }
        })

        return word
    }

    const addMessageInChat = (message: string) => {
        const test = editLongOneWord(message);
        const test2 = editLongOneWord(test);
        const test3 = editLongOneWord(test2);
        const test4 = editLongOneWord(test3);
        messages.sendMessage({messageText: test4, senderName: username});

        setMessage("")
    }

    const onClickToAddMessage = () => {
        if (message !== "") {
            addMessageInChat(message)
        }
    }

    console.log(messages.chatName);

    return (
        <>
            <Box bgcolor={'#25334e78'} minHeight={'7vh'} width={'100%'} display={'flex'}>
                <Paper sx={{display: "flex", width: '100%', backgroundColor: '#25334e78'}}>
                    <Box padding={1} color={'white'} alignSelf={'center'}>
                        <Grid item xs={25} fontSize={22}>
                            {messages.chatName[0]}
                        </Grid>
                        {/*<Grid item xs={25} fontSize={12}>*/}
                        {/*    Was online 2 hours ago*/}
                        {/*</Grid>*/}
                    </Box>
                    <Box sx={{ml: 1, flex: 1}}/>
                    <Box sx={{p: '8px'}} alignSelf={'center'}>
                        <IconButton color="primary" onClick={handleClickOpen} aria-label="directions">
                            <SettingsSharpIcon/>
                        </IconButton>
                        <RenameChat open={open} handleClose={handleClose} message={messages}/>
                        <IconButton color="primary">
                            <SearchOutlinedIcon/>
                        </IconButton>
                    </Box>
                </Paper>
            </Box>

            <Box maxHeight={'88vh'} height={'100%'} sx={{overflow: "hidden", overflowY: "scroll"}}>
                <Stack>
                    {messages.messages.map((e: any) => {
                        if (e.currentUser) {
                            return (
                                <Grid container justifyContent={'end'} wrap="nowrap"
                                      ref={scrollRef} marginTop={'5px'} padding={1}>
                                    <Grid sx={{alignSelf: 'center'}}>
                                        <Item>
                                            <Typography>{e.messageText}</Typography>
                                        </Item>
                                    </Grid>
                                    <Grid>
                                        <Avatar>{e.senderName.charAt(0)}</Avatar>
                                    </Grid>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid container wrap="nowrap" marginTop={'5px'} padding={1} ref={scrollRef}>
                                    <Grid>
                                        <Avatar>{e.senderName.charAt(0)}</Avatar>
                                    </Grid>
                                    <Grid sx={{alignSelf: 'center'}}>
                                        <Item>
                                            <Typography>{e.messageText}</Typography>
                                        </Item>
                                    </Grid>
                                </Grid>
                            )
                        }
                    })}
                </Stack>
            </Box>

            <Box bgcolor={'#25334e78'} minHeight={'5vh'} sx={{textAlign: '-webkit-center'}}>
                <Paper sx={{display: "flex", width: '100%', background: "#25334e78"}}>
                    <IconButton sx={{p: '10px'}} aria-label="menu">
                        <AttachFileOutlinedIcon sx={{color: "grey"}}/>
                    </IconButton>
                    <InputBase
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && message !== "") {
                                addMessageInChat(message)
                            }
                        }}
                        placeholder="Wrote message..."
                        sx={{ml: 1, flex: 1, color: "white"}}
                    />
                    <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                        <SentimentSatisfiedAltIcon/>
                    </IconButton>
                    <IconButton color="primary" onClick={onClickToAddMessage} sx={{p: '10px'}} aria-label="directions">
                        <SendOutlinedIcon/>
                    </IconButton>
                </Paper>
            </Box>
        </>
    )
}

export default Chat