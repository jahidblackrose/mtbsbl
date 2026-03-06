using System;
using System.Collections.Generic;

namespace SBL.Web.Models.ViewModels;

public class ConversationViewModel
{
    public string OtherUserName { get; set; } = "System Administrator";
    public string OtherUserDept { get; set; } = "IT/Audit";
    public List<ChatMessage> Messages { get; set; } = new();
}

public class ChatMessage
{
    public string SenderName { get; set; } = string.Empty;
    public string SenderDept { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public bool IsMe { get; set; }
}
