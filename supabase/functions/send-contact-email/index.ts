import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  company: string;
  message: string;
  source: "contact_form" | "chatbot";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, company, message, source }: ContactEmailRequest = await req.json();

    console.log(`Received contact request from ${source}:`, { name, email, company });

    // Validate inputs
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const sourceLabel = source === "chatbot" ? "🤖 Zyora AI Chatbot" : "📝 Contact Form";
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    // Premium styled email HTML
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0a0a0b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #0a0a0b 0%, #111113 100%); min-height: 100vh;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%;">
              
              <!-- Header -->
              <tr>
                <td style="text-align: center; padding-bottom: 40px;">
                  <div style="display: inline-block; background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 20px 40px;">
                    <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff; letter-spacing: -0.5px;">
                      ✨ New Lead from ${sourceLabel}
                    </h1>
                  </div>
                </td>
              </tr>

              <!-- Main Card -->
              <tr>
                <td>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; overflow: hidden; backdrop-filter: blur(20px);">
                    
                    <!-- Gradient Top Border -->
                    <tr>
                      <td style="height: 4px; background: linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.3) 50%, #ffffff 100%);"></td>
                    </tr>

                    <tr>
                      <td style="padding: 40px;">
                        
                        <!-- Date Badge -->
                        <div style="display: inline-block; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 50px; padding: 8px 16px; margin-bottom: 30px;">
                          <span style="color: rgba(255,255,255,0.6); font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">
                            📅 ${currentDate}
                          </span>
                        </div>

                        <!-- Contact Details -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                          
                          <!-- Name -->
                          <tr>
                            <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td width="120" style="color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">
                                    👤 Name
                                  </td>
                                  <td style="color: #ffffff; font-size: 16px; font-weight: 500;">
                                    ${name}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <!-- Email -->
                          <tr>
                            <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td width="120" style="color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">
                                    ✉️ Email
                                  </td>
                                  <td>
                                    <a href="mailto:${email}" style="color: #ffffff; font-size: 16px; font-weight: 500; text-decoration: none;">
                                      ${email}
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                          <!-- Company -->
                          <tr>
                            <td style="padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
                              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                  <td width="120" style="color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;">
                                    🏢 Company
                                  </td>
                                  <td style="color: #ffffff; font-size: 16px; font-weight: 500;">
                                    ${company || "Not provided"}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>

                        </table>

                        <!-- Message Section -->
                        <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px;">
                          <div style="color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: 500; margin-bottom: 12px;">
                            💬 Message / Query
                          </div>
                          <div style="color: #ffffff; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">
${message}
                          </div>
                        </div>

                        <!-- Quick Reply Button -->
                        <div style="text-align: center; margin-top: 30px;">
                          <a href="mailto:${email}?subject=Re: Your inquiry to Zyora AI Agency" style="display: inline-block; background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%); color: #0a0a0b; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 50px; letter-spacing: 0.5px;">
                            ↩️ Reply to ${name}
                          </a>
                        </div>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="text-align: center; padding-top: 40px;">
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0;">
                    Sent from <strong style="color: rgba(255,255,255,0.6);">Zyora AI Agency</strong> Website
                  </p>
                  <p style="color: rgba(255,255,255,0.3); font-size: 11px; margin: 8px 0 0;">
                    Powered by Zyora AI • Automated Lead Capture
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Zyora AI Agency <onboarding@resend.dev>",
      to: ["ZyoraAIAgency@outlook.com"],
      subject: `🚀 New Lead: ${name} ${company ? `from ${company}` : ""} - via ${source === "chatbot" ? "Zyora AI" : "Contact Form"}`,
      html: emailHtml,
      reply_to: email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
