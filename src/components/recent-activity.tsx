import { useNameServiceEvents, getEventStyle } from "@/hooks/useENSevents";
import { formatRelativeTime, truncateAddress } from "@/lib/utils";
import { useAccount } from "wagmi";
import { CHAIN_IDS } from "@/lib/chain-utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  User,
  ArrowRight,
  Edit,
  Clock,
  Hash,
} from "lucide-react";

// Helper function to get event icon component
function getEventIcon(eventName: string) {
  switch (eventName) {
    case "NameRegistered":
      return <User className="w-4 h-4" />;
    case "NameTransferred":
      return <ArrowRight className="w-4 h-4" />;
    case "NameUpdated":
      return <Edit className="w-4 h-4" />;
    default:
      return <Hash className="w-4 h-4" />;
  }
}

interface RecentActivityProps {
  limit?: number;
}

export function RecentActivity({ limit = 10 }: RecentActivityProps) {
  const { data: events, isLoading, error } = useNameServiceEvents();
  const { address, chainId } = useAccount();

  // Empty state for no wallet connection
  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Connect your wallet to view recent name service activities and
          transactions.
        </p>
      </div>
    );
  }

  // Wrong network state
  if (chainId !== CHAIN_IDS.CELO_ALFAJORES) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
          <Hash className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Wrong Network</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Please switch to the Celo Alfajores network to view recent activities.
        </p>
        <Badge variant="outline" className="mt-3">
          Current: {chainId ? `Chain ${chainId}` : "Unknown"}
        </Badge>
      </div>
    );
  }

  // Loading state with modern skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-muted rounded-full w-20"></div>
                    <div className="h-6 bg-muted rounded-full w-16"></div>
                  </div>
                </div>
                <div className="h-3 bg-muted rounded w-20 flex-shrink-0"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <ExternalLink className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-red-600">
          Failed to Load
        </h3>
        <p className="text-muted-foreground text-center max-w-sm mb-4">
          Unable to fetch recent activities. Please check your connection and
          try refreshing the page.
        </p>
        <Badge variant="destructive">Error</Badge>
      </div>
    );
  }

  // No events state
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Recent Activity</h3>
        <p className="text-muted-foreground text-center max-w-sm">
          No recent name service activities found. Activities will appear here
          once transactions are made.
        </p>
      </div>
    );
  }

  const displayEvents = events.slice(0, limit);

  return (
    <div className="space-y-4">
      {/* Activity Counter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            {events.length} Total Activities
          </Badge>
          {events.length > limit && (
            <Badge variant="outline" className="px-3 py-1">
              Showing {limit} of {events.length}
            </Badge>
          )}
        </div>
      </div>

      {/* Events List */}
      <div className="grid gap-4">
        {displayEvents.map((event, index) => {
          const { color } = getEventStyle(event);
          return (
            <Card
              key={`${event.transactionHash}-${event.logIndex}`}
              className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-transparent hover:border-l-primary"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Event Icon */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${
                        event.eventName === "NameRegistered"
                          ? "from-blue-100 to-blue-200 text-blue-600"
                          : event.eventName === "NameTransferred"
                            ? "from-green-100 to-green-200 text-green-600"
                            : "from-yellow-100 to-yellow-200 text-yellow-600"
                      }`}
                    >
                      {getEventIcon(event.eventName)}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    {/* Main Description */}
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className={`font-semibold text-sm ${color}`}>
                        {event.eventName === "NameRegistered" &&
                          "Name Registered"}
                        {event.eventName === "NameTransferred" &&
                          "Name Transferred"}
                        {event.eventName === "NameUpdated" && "Name Updated"}
                      </h4>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-2">
                      {event.eventName === "NameRegistered" && (
                        <div className="grid sm:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-medium">
                              Name:
                            </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                              {event.name.length > 20
                                ? `${event.name.slice(0, 20)}...`
                                : event.name}
                            </code>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-medium">
                              Owner:
                            </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                              {truncateAddress(event.owner)}
                            </code>
                          </div>
                        </div>
                      )}

                      {event.eventName === "NameTransferred" && (
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-medium">
                              Name:
                            </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                              {event.name.length > 20
                                ? `${event.name.slice(0, 20)}...`
                                : event.name}
                            </code>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground font-medium">
                                From:
                              </span>
                              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                {truncateAddress(event.oldOwner)}
                              </code>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground font-medium">
                                To:
                              </span>
                              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                {truncateAddress(event.newOwner)}
                              </code>
                            </div>
                          </div>
                        </div>
                      )}

                      {event.eventName === "NameUpdated" && (
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground font-medium">
                              Name:
                            </span>
                            <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                              {event.name.length > 20
                                ? `${event.name.slice(0, 20)}...`
                                : event.name}
                            </code>
                          </div>
                          <div className="grid sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground font-medium">
                                New Address:
                              </span>
                              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                {truncateAddress(event.newAddress)}
                              </code>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground font-medium">
                                Image Hash:
                              </span>
                              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                {event.newImageHash.slice(0, 10)}...
                              </code>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Transaction Details */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Block #{event.blockNumber.toString()}
                          </div>
                          <a
                            href={`https://alfajores.celoscan.io/tx/${event.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View on Celoscan
                          </a>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatRelativeTime(event.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Show More Indicator */}
      {events.length > limit && (
        <Card className="bg-muted/50">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {limit} of {events.length} total activities
            </p>
            <Badge variant="outline" className="mt-2">
              {events.length - limit} more activities available
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
